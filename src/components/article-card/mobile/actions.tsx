"use client";

import React from "react";
import { ArticleCardProps } from "..";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MessagesSquareIcon,
  ZapIcon,
} from "lucide-react";
import { nFormatter } from "@/lib/misc";
import anime from "animejs";
import { twJoin } from "tailwind-merge";
import { Button } from "@/components/ui/button";

export default function Actions(props: ArticleCardProps) {
  const [voted, setvoted] = React.useState<"upvote" | "downvote" | null>(null);
  const upvoteRef = React.useRef<HTMLSpanElement>(null);
  const downvoteRef = React.useRef<HTMLSpanElement>(null);

  const handlevote = (input: "upvote" | "downvote") => {
    anime({
      targets: input === "upvote" ? upvoteRef.current : downvoteRef.current,
      translateY: [input === "upvote" ? -5 : 5, 0],
      duration: 500,
      easing: "easeOutElastic(5, .4)",
    });

    if (voted === input) {
      setvoted(null);
    } else {
      setvoted(input);
    }
  };
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex-1 flex justify-start">
        <Button
          variant="ghost"
          onClick={() => handlevote("upvote")}
          className={twJoin(
            "px-2 py-1 gap-0.5 text-success",
            voted === "upvote" && "hover:bg-success/10 bg-success/20",
          )}
        >
          <span ref={upvoteRef}>
            <ArrowUpIcon className="w-5 h-5" />
          </span>
          {nFormatter(props.upvotes)}
        </Button>

        <Button
          variant="ghost"
          onClick={() => handlevote("downvote")}
          className={twJoin(
            "px-2 py-1 gap-0.5 text-error",
            voted === "downvote" && "hover:bg-error/10 bg-error/20",
          )}
        >
          <span ref={downvoteRef}>
            <ArrowDownIcon className="w-5 h-5" />
          </span>
          {nFormatter(props.downvotes)}
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <Button variant="ghost" className="px-2 py-1 gap-1 text-subText">
          <MessagesSquareIcon className="w-5 h-5 text-textColor" />
          {nFormatter(props.comments ?? 0)}
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        <Button variant="ghost" className="px-2 py-1 gap-1 text-subText">
          <ZapIcon className="w-5 h-5 text-warn" />
          {nFormatter(props.sats)}
        </Button>
      </div>
    </div>
  );
}
