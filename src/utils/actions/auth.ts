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

  // TODO: get cookie with prefered relays.
  // or maybe use sql to store.
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
  } catch (error) {
    // TODO: handle error properly
    console.error("There was an error while loggin in -> ", error);
  } finally {
    await setSession(profiles, EXPECTANCY.short);
    revalidatePath("/login");
    redirect("/");
  }
}

export async function logout() {
  await setSession(null, EXPECTANCY.logout);
  revalidatePath("/");
}
