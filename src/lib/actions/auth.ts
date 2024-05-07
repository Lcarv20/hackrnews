"use server";

import { kinds } from "nostr-tools";
import { DEFAULT_RELAYS, pool } from "@/lib/nostr";
import { setSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type Profile = {
  displayName?: string;
  name?: string;
  picture?: string;
  banner?: string;
  about?: string;
  website?: string;
  // readable address
  lud06?: string;
  // mess of chars
  lud16?: string;
  publickey?: string;
};

export async function loginWithExt(publickey: string, rememberMe = false) {
  let redirectPath: string | null = null;

  try {
    const profileEv = await pool.get(DEFAULT_RELAYS, {
      kinds: [kinds.Metadata],
      authors: [publickey],
    });

    if (!profileEv?.content) {
      throw new Error("No profile found");
    }
    const json = JSON.parse(profileEv.content);

    const profile: Profile = {
      publickey,
      name: json.name,
      displayName: json.display_name,
      picture: json.picture,
      banner: json.banner,
      about: json.about,
      website: json.website,
      lud06: json.lud06,
      lud16: json.lud16,
    };
    await setSession(profile, rememberMe);
    revalidatePath("/login");
    redirectPath = "/";
  } catch (error) {
    // TODO: handle error properly
    // TODO: log error on some service or db (like firebase).
    console.error("There was an error while loggin in -> ", error);
    throw error;
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}

export async function logout() {
  await setSession(null);
  revalidatePath("/");
}

export async function testAction() {
  cookies().set("test", "test", { maxAge: 360 });
}
