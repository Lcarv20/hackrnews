'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getProviders } from "@/utils/nostr"; // Import your Nostr provider logic

interface NostrContextValue {
  webln: {
    enable: () => Promise<void>;
    enabled: boolean;
  };
  nostr: {
    getPublicKey: () => Promise<string>;
    getRelays: () => Promise<string[]>;
    signEvent: (event: NostrEvent) => Promise<NostrEvent>;
    nip44: {
      encrypt: (pubkey: string, cypherText: string) => Promise<string>;
      decrypt: (pubkey: string, cypherText: string) => Promise<string>;
    };
  };
}

export const nostrCtx = createContext<NostrContextValue | null>(null);

export const useNostr = (): NostrContextValue => {
  const context = useContext(nostrCtx);

  if (!context) {
    throw new Error("NostrContext must be used within a NostrProvider");
  }

  return context;
};

export default function NostrProvider({ children }: { children: React.ReactNode }) {
  const [providers, setProviders] = useState<NostrContextValue | null>(null);

  useEffect(() => {
    const initializeProviders = async () => {
      try {
        const { webln, nostr } = await getProviders();
        setProviders({ webln, nostr });

        // Enable WebLN if necessary (assuming webln?.enable exists)
        if (!webln?.enabled) {
          await webln?.enable();
        }
      } catch (error) {
        console.error("Error initializing Nostr providers:", error);
      }
    };

    initializeProviders();
  }, []);

  return (
    <nostrCtx.Provider value={providers}>{children}</nostrCtx.Provider>
  );
}

