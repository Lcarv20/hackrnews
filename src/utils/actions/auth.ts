"use server";

import { kinds } from "nostr-tools";
import { DEFAULT_RELAYS, pool } from "@utils/nostr";
import { setSession } from "@utils/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type Profile = {
  relay: string;
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
  const profiles: Profile[] = [];
  let redirectPath: string | null = null;

  try {

    for (const relay of DEFAULT_RELAYS) {
      const filter = {
        kinds: [kinds.Metadata],
        authors: [publickey],
      };
      // TODO: Check how to handle bad relays
      const event = await pool.querySync([relay], filter);
      if (!event[0]) {
        continue;
      }
      const json = JSON.parse(event[0].content);

      const profile: Profile = {
        relay,
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
      profiles.push(profile);
    }

    if (!profiles.length) {
      throw new Error("No profile found");
    }

    await setSession(profiles, rememberMe);
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
