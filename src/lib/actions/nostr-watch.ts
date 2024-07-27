"use server";

import { NOSTR_WATCH } from "@/lib/constants";
import { parseRelays } from "@/lib/nostr";

export async function nostrWatchAction() {
  const res = await fetch(NOSTR_WATCH);
  const json = await res.json();
  return parseRelays(json);
}
