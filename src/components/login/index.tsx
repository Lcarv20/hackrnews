"use client";

import Logo from "@/components/logo";
import { BlocksIcon, InfoIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { NostrService, useNostr } from "@/utils/hooks/use-nostr";
import { loginWithExt } from "@/utils/actions/auth";
import Checkbox from "@/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Login({ isModal = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const nostr = useNostr();
  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    // this check is redundant because the button is disabled, bun in case users try to tweak with
    // the input in the developer console
    if (!nostr) {
      console.error("Nostr extension not found");
      toast.error("Nostr extension not found");
      setIsLoading(false);
      return;
    }

    try {
      const publickey = await nostr.getPublicKey();
      await loginWithExt(publickey, rememberMe);

      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed, try again");
    } finally {
      if (isModal) {
        router.back();
      }
      setIsLoading(false);
    }
  }

  return (
    <form>
      <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <div className="mb-8">
          <Logo isLink={false} />
        </div>

        <div className="rounded flex gap-2 py-3 items-center text-subText justify-center bg-surface1">
          <InfoIcon className="w-4 h-4 text-info" />
          <p className="text-xs">More options coming soon</p>
        </div>

        <Button
          onClick={handleLogin}
          variant="default"
          className="w-full"
          disabled={isLoading || !nostr}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <BlocksIcon className="w-5 h-5 justify-self-end" />
          )}

          {isLoading ? "Logging in..." : "Login with extension"}
        </Button>

        <div className="flex items-center gap-2 justify-end">
          <label
            htmlFor="rememberMe"
            className="text-xs cursor-pointer text-subText"
          >
            Remember me
          </label>
          <Checkbox
            disabled={!nostr}
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={async (e) => {
              setRememberMe(e.valueOf() as boolean);
            }}
          />
        </div>
        {nostr === null && (
          <p className="p-2 border border-error rounded bg-error/10 text-sm">
            {`It seems you don't have a nostr compatible extension`}
          </p>
        )}

        <NostrAvailability nostr={nostr} />
      </div>
    </form>
  );
}

function NostrAvailability({ nostr }: { nostr: NostrService }) {
  if (nostr === null) {
    return (
      <div className="p-2 border border-error rounded bg-error/10 text-sm">
        {`It seems you don't have a nostr compatible extension`}
      </div>
    );
  }

  if (nostr === undefined) {
    return (
      <div className="p-2 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return null;
}
