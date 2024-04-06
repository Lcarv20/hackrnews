"use client";

import { Button } from "@ui/buttons";
import Logo from "@components/logo";
import { BlocksIcon, InfoIcon, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { nostrCtx } from "@/providers/nostr-provider";
import { loginWithExt } from "@/utils/actions/auth";
import Checkbox from "@/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login({ isModal = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<any | null>(null);
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
      await loginWithExt(publickey, rememberMe);
    } catch (error) {
      // TODO: submit error to some logger later
      setError(error);
      toast.error("Login failed, try again");
    } finally {
      if (!error) {
        toast.success("Logged in successfully!");
        if (isModal) {
          router.back();
          setIsLoading(false);
        }
      }
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
          variant="primary"
          className="w-full"
          disabled={isLoading}
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
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(e) => {
              setRememberMe(e.valueOf() as boolean);
            }}
          />
        </div>
      </div>
    </form>
  );
}
