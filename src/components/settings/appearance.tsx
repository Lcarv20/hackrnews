"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import anime from "animejs";
import {
  ComputerIcon,
  SunIcon,
  MoonIcon,
  LaptopIcon,
} from "lucide-react";

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
    <div className="space-y-8">
      <fieldset>
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
                    // name={theme.name}
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
    </div>
  );
}
