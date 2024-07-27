"use server";

import { loginFormSchema } from "@/components/login/schemas";
import { DEFAULT_SOURCE } from "@/lib/constants";
import { InvalidSessionError } from "@/lib/exceptions";
import { generateTokenExp } from "@/lib/misc";
import { Profile } from "@/lib/nostr";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { kinds, Relay } from "nostr-tools";
import { z } from "zod";
import { CookieStore } from "../entities";

export async function loginAction(
  publickey: string,
  data: z.infer<typeof loginFormSchema>,
) {
  const source = data.source?.value || DEFAULT_SOURCE;
  const eventData = await getProfile(publickey, source);

  const profile = new Profile(publickey, eventData);
  console.log(profile);
  await setSession(profile, data.rememberMe);
  await setPreferedSourceAction(data.source?.value);
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

async function setPreferedSourceAction(source: string | undefined) {
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

export async function logoutAction() {
  try {
    await setSession(null);
    revalidatePath("/");
  } catch (e) {
    throw new Error("Something went wrong!");
  }
}

// SESSION
async function getJwtSecretKey() {
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

async function setSession(user: Profile | null, rememberMe = false) {
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

async function getSession(): Promise<Profile | null> {
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

async function updateSession(request: NextRequest) {
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
