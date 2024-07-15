"use server";

import { DEFAULT_SOURCE } from "../constants";
import { InvalidSourceError } from "../exceptions";
import { UrlProtocolUtils } from "../misc";

// FIXME: THIS FUNCTION NEEDS TO BE ADJUSTED
export async function getRelayInfo(relay: string) {
  try {
    const usesDefault = relay.length === 0;
    relay = usesDefault ? DEFAULT_SOURCE : relay;
    const source = UrlProtocolUtils.toHTTP(relay);

    const res = await fetch(source, {
      method: "GET",
      headers: {
        Accept: "application/nostr+json",
      },
    });

    if (!res.ok) throw new InvalidSourceError();

    const json = await res.json().catch((_) => {
      throw new InvalidSourceError("Failed to obtain relay information.");
    });

    return usesDefault ? null : relay;
  } catch (error) {
    console.error(error);
    throw new InvalidSourceError("Invalid source. Please try another.");
  }
}
