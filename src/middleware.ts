import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/utils/session";

export async function middleware(request: NextRequest) {
  await updateSession(request);

  redirectNotLoggedIn(request);
  redirectLoggedIn(request);
}

// Limit the middleware to certain paths
export const config = {
  matcher: ["/login/:path*", "/account/:path*"],
};

async function redirectLoggedIn(request: NextRequest) {
  const session = await getSession();
  if (session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

async function redirectNotLoggedIn(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
