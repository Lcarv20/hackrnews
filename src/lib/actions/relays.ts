"use server";

import { DEFAULT_RELAYS } from "@/lib/nostr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getRelays(): Promise<string[]> {
  const store = cookies();
  const clientRelays = store.get("relays")?.value;

  if (clientRelays) {
    return JSON.parse(clientRelays);
  }

  store.set("relays", JSON.stringify(DEFAULT_RELAYS));

  return DEFAULT_RELAYS;
}

type AddRelayRespose = {
  relays: string[];
  error?: string;
};

export async function addRelay(relays: string[]): Promise<AddRelayRespose> {
  console.log("newRelay", newRelay);

  // TODO: add validation

  const relays = await getRelays();

  console.log("relays", [...relays, newRelay]);

  return {
    relays: [...relays, newRelay],
  };

  // handle duplicate relay
  if (relays.includes(newRelay)) {
    return {
      relays,
      error: "Duplicate relay",
    };
  }

  relays.push(newRelay);
  cookies().set("relays", JSON.stringify(relays));

  // not sure if this is needed since the user is in a different endpoint and we are using
  // websockets and not fetch
  revalidatePath("/", "layout");

  return { relays };
}
