import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Profile } from "./actions/auth";
import { InvalidSessionError } from "./exceptions";
import { getTokenExpiration } from "./misc";

export function getJwtSecretKey() {
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

  const expires = getTokenExpiration(rememberMe);
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
    parsed.expires = getTokenExpiration(parsed.rememberMe);

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
    .setExpirationTime(getTokenExpiration(payload.rememberMe))
    .sign(getJwtSecretKey());
}

export async function decode(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey(), {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (e) {
    throw new InvalidSessionError((e as Error).message);
  }
}
