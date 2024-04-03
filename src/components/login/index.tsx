"use client";

import { Button } from "@ui/buttons";
import Logo from "@components/logo";
import { BlocksIcon, InfoIcon } from "lucide-react";
import { useContext, useState } from "react";
import { nostrCtx } from "@/providers/nostr-provider";
import { loginWithExt } from "@/utils/actions/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const providers = useContext(nostrCtx);
  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    if (!providers?.webln || !providers?.nostr) {
      alert("Oops, it seems you don't have an extension compatible with Nostr");
      return;
    }
    try {
      const publickey = await providers.nostr.getPublicKey();
      await loginWithExt(publickey);
    } catch (error) {
      // TODO: handle error properly
      console.error("There was an error while loggin in -> ", error);
      throw error;
    } finally {
      setIsLoading(false);
      router.back();
    }
  }

  return (
    <form>
      <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <div className="mb-8">
          <Logo isLink={false} />
        </div>

        <div className="rounded flex gap-2 py-3 items-center text-discreetText justify-center bg-surface1">
          <InfoIcon className="w-4 h-4 text-info" />
          <p className="text-xs">More options coming soon</p>
        </div>

        <Button
          onClick={handleLogin}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          <BlocksIcon className="w-5 h-5 justify-self-end" />
          Login with extension
        </Button>
      </div>
    </form>
  );
}
