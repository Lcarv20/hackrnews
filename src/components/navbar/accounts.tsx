"use client";

import { Profile, testAction } from "@/utils/actions/auth";
import { Button } from "@ui/buttons";
import { logout } from "@/utils/actions/auth";
import * as Popover from "@radix-ui/react-popover";
import { floatClasses } from "@/ui/prestyled";
import { twJoin } from "tailwind-merge";
import { LogOutIcon, PlusIcon } from "lucide-react";

export default function Accounts({ profiles }: { profiles: Profile[] }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" className="flex -space-x-4">
          {profiles?.map((account) => (
            <img
              key={account.relay}
              className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
              width={8}
              height={8}
              src={account.picture}
              alt="Profile Picus"
            />
          ))}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={5}
          className={twJoin(
            "bg-surface2 rounded-xl z-10 float-border w-64",
            floatClasses,
          )}
        >
          <div className="p-1 space-y-1 w-64">
            <ul className="bg-background rounded-t-xl rounded-b max-h-[200px] overflow-y-auto overflow-x-hidden">
              {profiles?.map((account) => (
                <li
                  key={account.relay}
                  className={twJoin(
                    "flex items-center gap-2 p-3 cursor-pointer hover:bg-surface2",
                  )}
                >
                  <img
                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
                    width={8}
                    height={8}
                    src={account.picture}
                    alt="Profile Picus"
                  />

                  <span>{account.relay}</span>
                </li>
              ))}
              {profiles?.map((account) => (
                <li
                  key={account.relay}
                  className={twJoin(
                    "flex items-center gap-2 p-3 cursor-pointer hover:bg-surface3",
                  )}
                >
                  <img
                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
                    width={8}
                    height={8}
                    src={account.picture}
                    alt="Profile Picus"
                  />

                  <span>{account.relay}</span>
                </li>
              ))}
              {profiles?.map((account) => (
                <li
                  key={account.relay}
                  className={twJoin(
                    "flex items-center gap-2 p-3 cursor-pointer hover:bg-surface3",
                  )}
                >
                  <img
                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
                    width={8}
                    height={8}
                    src={account.picture}
                    alt="Profile Picus"
                  />

                  <span>{account.relay}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-0.5">
              <Button
                onClick={async() => {await testAction()}}
                className="flex-1 border-2 border-subText border-dotted rounded-bl-xl text-subText
                opacity-70 focus:outline-1 focus:outline-subText focus:opacity-100 
                "
              >
                <PlusIcon></PlusIcon>
                Add
              </Button>
              <Button
                onClick={async() => await logout()}
                variant="error"
                autoFocus={false}
                className="flex-1 rounded-br-xl"
              >
                <LogOutIcon></LogOutIcon>
                Log out
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
