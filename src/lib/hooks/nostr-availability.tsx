"use client";

import { useEffect, useState } from "react";

export type NostrService = {
  availability: NostrAvailability;
  nostr: Window["nostr"] | undefined;
};

export enum NostrAvailability {
  NO = "no",
  YES = "yes",
  UNKNOWN = "unknown",
}

export const useNostr = (): NostrService => {
  const [nostr, setNostr] = useState<Window["nostr"] | undefined>(undefined);
  const [availability, setAvailability] = useState<NostrAvailability>(
    NostrAvailability.UNKNOWN,
  );

  useEffect(() => {
    if (window.nostr) {
      setAvailability(NostrAvailability.YES);
      setNostr(window.nostr);
    } else {
      setAvailability(NostrAvailability.NO);
    }
  }, []);

  return {
    nostr,
    availability,
  };
};
