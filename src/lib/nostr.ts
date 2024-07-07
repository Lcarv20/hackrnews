import { SimplePool } from "nostr-tools";
import { UrlProtocolUtils } from "./misc";
import type { User } from "./nostr.d";

export const DEFAULT_RELAYS = [["wss://relay.damus.io"], ["wss://nos.lol"]];

export const pool = new SimplePool();

export function parseRelays(relays: string[][]) {
  return relays.map((relay) => relay[1]);
}

export class Profile implements User {
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
  relays?: string[][];

  constructor(
    pubkey: string,
    nostrEventData: NostrEvent | null,
    relaysEventData: NostrEvent | null,
  ) {
    const json = this.parseProfile(nostrEventData?.content);
    console.log(nostrEventData?.content);
    Object.assign(this, json);
    this.publickey = pubkey;
    this.relays = this.parseRelays(relaysEventData?.tags);
  }

  private parseProfile(profileStr: string | undefined) {
    if (profileStr) {
      return JSON.parse(profileStr);
    }
  }

  private parseRelays(relayData: string[][] | undefined) {
    if (relayData && relayData.length > 0) {
      return relayData
        .filter((tag) => tag[0] === "r")
        .map((tag) => [tag[1], tag[2]]);
    }
    return DEFAULT_RELAYS;
  }
}

export async function getRelayMetadata(relay: string) {
  const source = UrlProtocolUtils.toHTTP(relay);

  try {
    const req = await fetch(source, {
      headers: {
        Accept: "application/nostr+json",
      },
    });
    const json = await req.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
