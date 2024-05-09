"use client";

import {
  ArrowLeftFromLineIcon,
  ArrowLeftIcon,
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
import Appearance from "./appearance";
import Relays from "./relays";

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
    body: <Appearance />,
  },
  {
    name: "Relays",
    icon: <ServerIcon />,
    body: <Relays />,
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
          <SheetContent className="min-w-full border flex flex-col">
            <SheetHeader className="pt-8">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="absolute left-4 top-4"
                  onClick={() => {
                    anime({
                      targets: "#main",
                      scale: 1,
                      easing: "easeOutExpo",
                    });
                  }}
                  size="icon"
                >
                  <ArrowLeftIcon />
                </Button>
              </SheetClose>
              <SheetTitle
                className="items-center gap-2 justify-center flex border-b-4 border-dotted
                border-brand pb-2 text-xl font-bold"
              >
                <span className="text-brand">{setting.icon}</span>
                {setting.name}
              </SheetTitle>
              {setting.description && (
                <SheetDescription>{setting.description}</SheetDescription>
              )}
            </SheetHeader>
            <div className="mt-6">{setting.body}</div>
            {/* <SheetFooter className="mt-auto flex-col items-start"> */}
            {/*   <SheetClose asChild> */}
            {/*     <Button */}
            {/*       onClick={() => { */}
            {/*         anime({ */}
            {/*           targets: "#main", */}
            {/*           scale: 1, */}
            {/*           easing: "easeOutExpo", */}
            {/*         }); */}
            {/*       }} */}
            {/*       size="icon" */}
            {/*     > */}
            {/*       <ArrowLeftFromLineIcon /> */}
            {/*     </Button> */}
            {/*   </SheetClose> */}
            {/* </SheetFooter> */}
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
