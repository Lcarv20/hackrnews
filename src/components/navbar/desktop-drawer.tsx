"use client";

import { ChevronsRightIcon, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { twJoin } from "tailwind-merge";
import ThemeToggler from "./theme-toggler";
import RelayPreferences from "./relay-preferences";
import { RoundButton } from "@/ui/buttons";
import { closeOnScreenSize } from "@/utils/functions";

export default function DesktopDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const content = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unmount = closeOnScreenSize(() => setOpen(false));
    return unmount;
  });

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      onClose={() => (document.body.style.backgroundColor = "")}
      direction="right"
    >
      <Drawer.Trigger className="rounded-full p-1.5">
        <Settings className="w-6 h-6" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          forceMount
          className="fixed inset-0 bg-black/40 z-[999]"
        />
        <Drawer.Content
          ref={content}
          className={twJoin(
            "bg-background z-[999] flex flex-col rounded-l-xl h-[90%] w-[400px] fixed inset-y-0",
            "right-0 my-auto focus:outline-none",
          )}
        >
          <div className="pt-3 pl-3">
            <RoundButton onClick={() => setOpen(false)}>
              <ChevronsRightIcon></ChevronsRightIcon>
            </RoundButton>
          </div>
          <div className="p-8 h-full overflow-hidden flex flex-col gap-10 justify-center">
            {/* THEME TOGGLER */}
            <div className="shrink-0">
              <ThemeToggler />
            </div>
            <div className="grow overflow-y-hidden scrollbar-hide">
              <RelayPreferences />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
