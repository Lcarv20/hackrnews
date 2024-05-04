"use client";

import {
  ArrowLeftFromLineIcon,
  ChevronRightIcon,
  ServerIcon,
  SwatchBookIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import anime from "animejs";

type SettingsValue = {
  name: string;
  icon: React.ReactNode;
  description?: string;
  body: React.ReactNode;
};

const SETTINGS_VALUES: SettingsValue[] = [
  {
    name: "Appearance",
    icon: <SwatchBookIcon />,
    body: <div>Appearance</div>,
  },
  {
    name: "Relays",
    icon: <ServerIcon />,
    body: <div>Relays</div>,
  },
];

export default function MobileSettings() {
  // each menu option opens a sheet that takes the whole screen
  return (
    <div className="lg:hidden space-y-2">
      {SETTINGS_VALUES.map((setting) => (
        <Sheet key={setting.name}>
          <SheetTrigger asChild>
            <Button
              onClick={() => {
                anime({
                  targets: "#main",
                  scale: 0.9,
                  easing: "easeOutExpo",
                });
              }}
              key={setting.name}
              variant="outline"
              className={cn(
                "group hover:border-brand hover:bg-accent transition-all",
                "flex flex-row items-center gap-4 w-full h-16",
              )}
            >
              <span className="group-hover:text-brand transition group-hover:scale-110">
                {setting.icon}
              </span>
              <h1 className="text-lg transform transition-transform group-hover:translate-x-3">
                {setting.name}
              </h1>
              <ChevronRightIcon className="h-7 w-7 ml-auto text-muted-foreground transition-all group-hover:scale-125" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader>
              <SheetTitle>{setting.name}</SheetTitle>
              {setting.description && (
                <SheetDescription>{setting.description}</SheetDescription>
              )}
            </SheetHeader>
            {setting.body}
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  shape="circle"
                  onClick={() => {
                    anime({
                      targets: "#main",
                      scale: 1,
                      easing: "easeOutExpo",
                    });
                  }}
                  size="icon"
                >
                  <ArrowLeftFromLineIcon />
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
