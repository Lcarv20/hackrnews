"use client";

import { useEffect, useState } from "react";
import { nostrWatchAction } from "../actions/nostr-watch";

export function useNostrWatch() {
  const [pending, setPending] = useState(true);
  const [relayList, setRelayList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    nostrWatchAction()
      .then((data) => {
        setRelayList(data);
      })
      .catch((e) => {
        //TODO: handle error better
        console.error(e);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return { pending, relayList };
}
