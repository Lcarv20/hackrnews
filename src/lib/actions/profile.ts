'use server'

import { cookies } from "next/headers"
import { DEFAULT_RELAYS } from "../nostr"

export async function getProfile(pk : string) {
// see the relays
    const relays = cookies().get('relays')?.value ?? DEFAULT_RELAYS
    const sources = parseRelays(relays)
}
