"use client";

import { useState } from "react";
import { getRelayInfo } from "../actions/relays";

export function useRelay() {
  const [pending, setPending] = useState(false);

  const setRelay = async (relay: string) => {
    setPending(true);
    const res = await getRelayInfo(relay);
    console.log("res: ", res);
    setPending(false);
    return res;
  };

  return { pending, setRelay };
}
