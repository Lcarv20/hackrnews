"use server";

import { kinds } from "nostr-tools";
import { DEFAULT_RELAYS, pool } from "@utils/nostr";
import { setSession, EXPECTANCY } from "@utils/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function loginWithExt(publickey: string) {
  const profiles: Profile[] = [];
  let redirectPath: string | null = null;
  try {
    for (const relay of DEFAULT_RELAYS) {
      const filter = {
        kinds: [kinds.Metadata],
        authors: [publickey],
      };
      const event = await pool.querySync([relay], filter);
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

    await setSession(profiles, EXPECTANCY.short);
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
  await setSession(null, EXPECTANCY.logout);
  revalidatePath("/");
}
