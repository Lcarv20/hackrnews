import { NextRequest } from "next/server";
import { updateSession } from "@/utils/session";

export async function middleware(request: NextRequest) {
  await updateSession(request);
}
