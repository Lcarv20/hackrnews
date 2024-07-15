"use server";

import { loginFormSchema } from "@/components/login/schemas";
import { DEFAULT_SOURCE } from "@/lib/constants";
import { Profile } from "@/lib/nostr";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { kinds, Relay } from "nostr-tools";
import { z } from "zod";
import { InvalidSessionError } from "@/lib/exceptions";
import { generateTokenExp } from "@/lib/misc";
import { CookieStore } from "../entities";

export async function login(
  publickey: string,
  data: z.infer<typeof loginFormSchema>,
) {
  const source = data.source || DEFAULT_SOURCE;
  const eventData = await getProfile(publickey, source);

  const profile = new Profile(publickey, eventData);
  console.log(profile);
  await setSession(profile, data.rememberMe);
  await setPreferedSource(data.source);
}

type GetProfileRes = Promise<{
  profile: NostrEvent;
  relays: NostrEvent;
}>;

async function getProfile(pk: string, source: string): GetProfileRes {
  let profileEv: NostrEvent;
  let relaysEv: NostrEvent;

  return new Promise(async (resolve, reject) => {
    // NOTE: If trying to connect to a non existent relay, it doens't throw.
    // setTimeout(() => {
    //   reject(new Error("Request timed out"));
    // }, 10000);

    try {
      const relay = await Relay.connect(source);
      const sub = relay.subscribe(
        [
          {
            kinds: [kinds.Metadata, kinds.RelayList],
            authors: [pk],
          },
        ],
        {
          onevent(event) {
            if (event.kind === kinds.Metadata) profileEv = event;
            if (event.kind === kinds.RelayList) relaysEv = event;
          },
          oneose() {
            sub.close();
            // I am not sure if the line above closes
            // the ws connection or not.
            relay.close();
            resolve({
              profile: profileEv,
              relays: relaysEv,
            });
          },
        },
      );
    } catch (error) {
      console.error(
        "Error while fething user metadata and relay list: ",
        error,
      );
      reject(new Error("Failed to connect to relay: " + source));
    }
  });
}

export async function setPreferedSource(source: string) {
  if (!!!source) {
    cookies().delete(CookieStore.PreferedSource);
    return;
  }

  cookies().set({
    name: CookieStore.PreferedSource,
    value: source,
    path: "/",
    httpOnly: true,
  });
}
export async function logout() {
  try {
    await setSession(null);
    revalidatePath("/");
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}

// SESSION

export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

type Payload = JWTPayload & {
  profile: Profile;
  expires: Date;
  rememberMe: boolean;
};

export async function setSession(user: Profile | null, rememberMe = false) {
  if (!user) {
    cookies().delete("session");
    return;
  }

  const expires = generateTokenExp(rememberMe);
  const value = await encode({ profile: user, expires, rememberMe });
  cookies().set({
    name: "session",
    value,
    expires,
    httpOnly: true,
    path: "/",
  });
}

export async function getSession(): Promise<Profile | null> {
  const session = cookies().get("session");
  if (!session?.value) return null;
  try {
    const data = await decode(session?.value!);
    return data.profile as Profile;
  } catch (e) {
    // TODO: log error
    console.error(e);
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const res = NextResponse.next();
  try {
    let parsed = (await decode(session)) as Payload;
    parsed.expires = generateTokenExp(parsed.rememberMe);

    res.cookies.set({
      name: "session",
      value: await encode(parsed),
      expires: parsed.expires,
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (e) {
    // TODO: log error to some system
    console.error(e);
    res.cookies.delete("session");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

async function encode(payload: Payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(generateTokenExp(payload.rememberMe))
    .sign(await getJwtSecretKey());
}

async function decode(token: string) {
  try {
    const { payload } = await jwtVerify(token, await getJwtSecretKey(), {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (e) {
    throw new InvalidSessionError((e as Error).message);
  }
}
