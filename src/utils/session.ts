import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Profile } from "./actions/auth";
import { InvalidSessionError } from "./exceptions";

const jwtSecret = "secret";
const key = new TextEncoder().encode(jwtSecret);

export const SESSION_DURATION = {
  // short: 60 * 60 * 1000,
  // long: 30 * 24 * 60 * 60 * 1000,
  short: 15 * 1000,
  long: 40 * 1000,
  logout: 0,
} as const;

export async function setSession(
  user: Profile[] | null,
  span = SESSION_DURATION.short,
) {
  let expires: Date;
  switch (span) {
    case SESSION_DURATION.short:
      // 1 hour
      cookies().set("rememberMe", "false", { maxAge: SESSION_DURATION.short });
      expires = new Date(Date.now() + SESSION_DURATION.short);
      break;
    case SESSION_DURATION.long:
      // 30 days
      cookies().set("rememberMe", "true", { maxAge: SESSION_DURATION.long });
      expires = new Date(Date.now() + SESSION_DURATION.long);
      break;
    case SESSION_DURATION.logout:
      expires = new Date(Date.now() + SESSION_DURATION.logout);
      break;
    default:
      expires = new Date(Date.now() + SESSION_DURATION.short);
  }

  const session = await encode({ profiles: user, expires });
  cookies().set({
    name: "session",
    value: session,
    path: "*",
    expires: expires,
    httpOnly: true,
  });
}

export async function getSession(): Promise<Profile[] | null> {
  const session = cookies().get("session");
  if (!session?.value) return null;
  try {
    const data = await decode(session?.value!);
    return data.profiles as Profile[];
  } catch (e) {
    // TODO: log error
    console.error(e);
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const rememberMe = cookies().get("rememberMe")?.value === "true";
  const duration = rememberMe ? SESSION_DURATION.long : SESSION_DURATION.short;

  try {
    let parsed = await decode(session);
    parsed.expires = new Date(Date.now() + duration);

    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encode(parsed),
      path: "/",
      expires: parsed.expires as Date,
      httpOnly: true,
    });
    return res;
  } catch (e) {
    // TODO: log error to some system
    console.error(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

async function encode(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decode(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (e) {
    throw new InvalidSessionError((e as Error).message);
  }
}
