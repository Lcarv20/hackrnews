"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { BlocksIcon, Loader2, TriangleAlertIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { NostrService, useNostr } from "@/lib/hooks/nostr-availability";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginWithExt } from "@/lib/actions/auth";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function LoginForm({ isModal = false }) {
  const [rememberMe, setRememberMe] = useState(false);
  const nostr = useNostr();
  const router = useRouter();
  const { data, pending } = useFormStatus();

  async function handleLogin() {
    // this check is redundant because the button is disabled, but in case users try to tweak with
    // the input in the developer console
    if (!nostr) {
      console.error("Nostr extension not found");
      toast.error("Nostr extension not found");
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
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Button variant="default" className="w-full" disabled={pending || !nostr}>
        {pending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <BlocksIcon className="w-5 h-5 justify-self-end" />
        )}

        {pending ? "Logging in..." : "Login with extension"}
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
      <NostrAvailability nostr={nostr} />
    </form>
  );
}

function NostrAvailability({ nostr }: { nostr: NostrService }) {
  if (!nostr) {
    return (
      <Alert className="bg-warn/5 mt-4">
        <TriangleAlertIcon className="h-4 w-4 fill-warn" />
        <AlertTitle>Oh no!</AlertTitle>
        <AlertDescription>
          It seems you don&apos;t have a{" "}
          <Link
            href="https://nostrcheck.me/register/browser-extension.php"
            className="underline underline-offset-2 decoration-black decoration-2 italic"
          >
            nostr compatible extension
          </Link>
          .
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
