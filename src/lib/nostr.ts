import { SimplePool } from "nostr-tools";

export const DEFAULT_RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
];
// export const DEFAULT_RELAYS = ["wss://relay.damus.io", "wss://nostr.nodeofsven.com", "wss://nos.lol"];

export const pool = new SimplePool();

