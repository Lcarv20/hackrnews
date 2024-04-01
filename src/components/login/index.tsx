"use client";

import { Button } from "@ui/buttons";
import Logo from "@components/logo";
import {
  BlocksIcon,
  InfoIcon,
} from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  async function loginWithExtension() {
    setIsLoading(true);
    // try {
    //   const { webln, nostr } = await getProviders();
    //   // Enabling the lightning network
    //   if (!webln.enabled) {
    //     await webln.enable();
    //     console.debug("webln enabled!!");
    //   }
    //   // Get publicKey
    //   const publickey = await nostr.getPublicKey();
    //   console.debug("public key:", publickey);
    //
    //   await retrieveProfile(publickey);
    // } catch (error) {
    //   // TODO: handle error properly
    //   console.error("There was an error while loggin in -> ", error);
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    // }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  return (
    <div className="flex flex-col gap-8 p-6 max-w-md mx-auto">
      <Logo isLink={false} />

      <div className="rounded flex gap-2 items-center text-discreetText bg-surface2 p-2 justify-center">
        <InfoIcon className="w-5 h-5 text-info" />

        <p className="font-bold text-xs">More ways to login comming soon!</p>
      </div>

      <Button variant="primary" className="w-full">
        <BlocksIcon className="w-5 h-5" />
        Login with extension
      </Button>
    </div>
  );
}
