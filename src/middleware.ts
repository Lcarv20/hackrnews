import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/utils/session";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const session = await getSession();

  if (request.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/account" && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
