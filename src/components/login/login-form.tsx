"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Divider from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { login } from "@/lib/actions/auth";
import { setPreferedSource } from "@/lib/actions/preferences";
import { DEFAULT_SOURCE } from "@/lib/constants";
import {
  NostrAvailability,
  NostrService,
  useNostr,
} from "@/lib/hooks/nostr-availability";
import { UrlProtocolUtils } from "@/lib/misc";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlocksIcon,
  Check,
  CircleXIcon,
  InfoIcon,
  RouterIcon,
  TriangleAlertIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type Option } from "./";
import { loginFormSchema } from "./schemas";
import { useRouter } from "next/navigation";

export default function ({
  relays,
  preferedSource,
  isModal = false,
}: {
  relays: Option[];
  preferedSource?: string;
  isModal?: boolean;
}) {
  const [search, setSearch] = useState(preferedSource || "");
  const [open, setOpen] = useState(false);
  const nostr = useNostr();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, setError, formState, setValue } = useForm<
    z.infer<typeof loginFormSchema>
  >({ resolver: zodResolver(loginFormSchema) });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const success = await loginWithExtension(nostr, data, setError);
        if (success && isModal) {
          router.back();
        } else if (success && !isModal) {
          router.push("/");
        }
      })}
      ref={formRef}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between p-2 rounded bg-info/10">
          <Label htmlFor="source">Select profile information relay</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-7 h-7 p-1.5 rounded-full">
                <InfoIcon className="text-info" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <p className="text-pretty">
                In order to display your profile correctly, provide one relay
                where you usually post. Note that this is only to retrive your
                profile information.
              </p>
              <br />
              <p className="text-sm">
                <span className="font-bold mr-2 uppercase">default:</span>
                <code className="bg-secondary text-secondary-foreground p-1 rounded font-mono">
                  {UrlProtocolUtils.removeProtocol(DEFAULT_SOURCE)}
                </code>
              </p>
            </PopoverContent>
          </Popover>
        </div>

        {formState.errors.source && (
          <div className="bg-destructive/10 text-destructive-foreground flex items-center justify-between p-2 rounded">
            <p>{formState.errors.source?.message}</p>
            <CircleXIcon className="w-4 h-4 mr-1.5 text-destructive" />
          </div>
        )}

        <div className="relative h-12">
          <Command
            className={cn(
              "rounded-lg border shadow-md absolute top-0 z-10 h-fit bg-background",
              !open && "border-b-0",
              formState.errors.source && "border-b border-destructive",
            )}
            onFocus={(_) => setOpen(true)}
            onBlur={(_) => setOpen(false)}
          >
            <CommandInput
              icon={<RouterIcon />}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter") {
                  setOpen(false);
                  e.currentTarget.blur();
                }
              }}
              placeholder="wss://relay.example.xyz"
              className="h-10"
              onValueChange={(e) => {
                setSearch(e);
              }}
              value={search}
              {...register("source")}
            />
            <CommandList hidden={!open}>
              <CommandEmpty onClick={(_) => setOpen(false)} className="p-1">
                <div
                  className={cn(
                    "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none bg-accent text-accent-foreground",
                  )}
                >
                  Connect to: {search}
                </div>
              </CommandEmpty>
              <CommandGroup>
                {relays.map((relay) => (
                  <CommandItem
                    key={relay.value}
                    value={relay.value}
                    onSelect={(currentValue) => {
                      setSearch(currentValue === search ? "" : currentValue);
                      setValue("source", currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        search === relay.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {relay.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <Divider />

      {nostr.availability === NostrAvailability.NO ? (
        <Alert variant="warn">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertTitle>Oh no!</AlertTitle>
          <AlertDescription>
            It seems you don&apos;t have a{" "}
            <Link
              href="https://nostrcheck.me/register/browser-extension.php"
              className="underline underline-offset-2 decoration-2 italic"
            >
              nostr compatible extension
            </Link>
            .
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex items-center gap-2 justify-end">
        <Label
          className="peer peer-disabled:cursor-not-allowed cursor-pointer peer-disabled:opacity-70"
          htmlFor="rememberMe"
        >
          Remember me
        </Label>
        <Checkbox
          disabled={nostr.availability === NostrAvailability.NO}
          id="rememberMe"
          {...register("rememberMe")}
        />
      </div>

      <Button
        variant="brand"
        type="submit"
        className="w-full"
        disabled={
          nostr.availability === NostrAvailability.NO ||
          nostr.availability === NostrAvailability.UNKNOWN ||
          formState.isSubmitting
        }
      >
        {nostr.availability === NostrAvailability.UNKNOWN ||
        formState.isSubmitting ? (
          <svg
            className="animate-spin mr-2 h-4 w-4 text-brand-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <BlocksIcon className="mr-2 h-4 w-4" />
        )}
        Login with extension.
      </Button>
    </form>
  );
}

async function loginWithExtension(
  nostrService: NostrService,
  data: z.infer<typeof loginFormSchema>,
  setError: UseFormSetError<{
    source: string;
    rememberMe: boolean;
  }>,
) {
  const { availability, nostr } = nostrService;

  if (availability === NostrAvailability.NO) {
    toast.error("It seems you don't have a nostr extension!");
    return;
  }
  try {
    const publickey = await nostr?.getPublicKey();
    if (!publickey) throw new Error("No public key found!");

    await login(publickey, data);
    return true;
  } catch (error) {
    console.error(error);
    const { message, name } = error as Error;
    setError("source", {
      message: "Invalid Relay",
    });

    toast.error(name, {
      description: message || "Something went wrong!",
    });
    return false;
  }
}
