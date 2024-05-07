import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/session";
import { InvalidSessionError } from "./lib/exceptions";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/account" && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    return await updateSession(request);
  } catch (e) {
    const res = NextResponse.next();
    const { name, message } = e as Error & { name: string; message: string };
    // log this message on the client using toast or find a better way to recover from a failed
    // updateSession()
    res.headers.set(
      InvalidSessionError.name,
      JSON.stringify({
        name,
        message,
      }),
    );

    return res;
  }
}
