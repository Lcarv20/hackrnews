import { Event } from "nostr-tools";

declare global {
  type NostrEvent = Event;

  // interface Window {
  //   nostr?: any;
  // }
  interface Window {
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
}
