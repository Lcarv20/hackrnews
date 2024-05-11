"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import anime from "animejs";
import {
  SunIcon,
  MoonIcon,
  LaptopIcon,
  ArrowLeftFromLineIcon,
  ChevronRightIcon,
  SwatchBookIcon,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Appearance() {
  const { theme: currTheme, setTheme } = useTheme();
  const indicatorRef = useRef<HTMLDivElement>(null);

  const themes = [
    {
      name: "system",
      icon: <LaptopIcon className="h-6 w-6 text-muted-foreground" />,
    },
    {
      name: "light",
      icon: <SunIcon className="h-6 w-6 text-warn" />,
    },
    {
      name: "dark",
      icon: <MoonIcon className="h-6 w-6 text-info" />,
    },
  ];

  const calculatePosition = useCallback((theme: string | undefined) => {
    switch (theme) {
      case "light":
        return "100%";
      case "dark":
        return "200%";
      default:
        return 0;
    }
  }, []);

  function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTheme(e.target.value);

    anime({
      targets: indicatorRef.current,
      translateX: [
        calculatePosition(currTheme),
        calculatePosition(e.target.value),
      ],
      easing: "spring(1, 90, 12, 5)",
    });
  }

  useEffect(() => {
    if (indicatorRef.current) {
      indicatorRef.current.style.transform = `translateX(${calculatePosition(currTheme)})`;
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group hover:border-brand hover:bg-accent transition-all",
            "flex flex-row items-center gap-4 w-full h-16",
          )}
        >
          <span className="group-hover:text-brand transition group-hover:scale-110">
            <SwatchBookIcon />
          </span>
          <h1 className="text-lg transform transition-transform group-hover:translate-x-3">
            Appearance
          </h1>
          <ChevronRightIcon className="h-7 w-7 ml-auto text-muted-foreground transition-all group-hover:scale-125" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-full border flex flex-col">
        <SheetHeader className="pt-8">
          <SheetTitle
            className="items-center gap-2 justify-center flex border-b-4 border-dotted
                border-brand pb-2 text-xl font-bold"
          >
            <span className="text-brand">
              <SwatchBookIcon />
            </span>
            Appearance
          </SheetTitle>
        </SheetHeader>

        <fieldset className="mt-6 space-y-8">
          <legend className="text-lg font-bold mb-2">Theme</legend>
          <div className="rounded-xl p-2 bg-accent">
            <div className="relative grid grid-cols-3 rounded-xl overflow-hidden">
              <div
                ref={indicatorRef}
                className={cn(
                  "absolute h-full w-1/3 bg-brand/30 shadow-lg text-brand-foreground",
                  "transform rounded-xl",
                )}
              />
              {themes.map((theme, idx) => (
                <div key={theme.name}>
                  <label
                    key={theme.name}
                    htmlFor={idx.toString()}
                    className={cn(
                      "col-span-1 w-full p-6 inline-flex cursor-pointer",
                      "items-center flex-col gap-3 bg-transparent",
                      "select-none",
                    )}
                  >
                    <input
                      id={idx.toString()}
                      checked={currTheme === theme.name}
                      onChange={handleThemeChange}
                      type="radio"
                      className="hidden"
                      value={theme.name}
                    />

                    <span>{theme.icon}</span>
                    <span>{theme.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <SheetFooter className="mt-auto flex-col items-start">
          <SheetClose asChild>
            <Button variant="outline" size="icon">
              <ArrowLeftFromLineIcon />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
