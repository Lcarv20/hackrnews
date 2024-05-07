"use client";

import { useEffect, useState } from "react";

export type NostrService = Window["nostr"] | null | undefined;

export const useNostr = (): NostrService => {
  const [nostr, setNostr] = useState<Window["nostr"] | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (window.nostr) setNostr(null);
    setNostr(window.nostr);
  });

  return nostr;
};
