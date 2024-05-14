import React from "react";
import { cn } from "@/lib/utils";

export default function DangerWrapper({
  children,
  outerClasses,
  innerClasses
}: {
  children: React.ReactNode;
  outerClasses?: string;
  innerClasses?: string;
}) {
  return (
    <div
      className={cn(
        "p-[2.5px] rounded-lg pattern-diagonal-lines pattern-yellow-500 pattern-bg-black",
        "pattern-size-4 pattern-opacity-80",
        outerClasses,
      )}
    >
      <div className={cn("bg-background rounded-lg p-2", innerClasses)}>
        {children}
      </div>
    </div>
  );
}
