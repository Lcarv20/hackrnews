"use client";
import { Button } from "@/ui/buttons";
import { nFormatter } from "@/utils/fns/number-formatter";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";
import { twJoin } from "tailwind-merge";

export default function Ranking(props: {
  postNr: number;
  upvotes: number;
  downvotes: number;
}) {
  const [voted, setvoted] = React.useState<"upvote" | "downvote" | null>(null);
  const handlevote = (input: "upvote" | "downvote") => {
    if (voted === input) {
      setvoted(null);
    } else {
      setvoted(input);
    }
  };

  return (
    <div className="hidden lg:flex flex-col">
      <Button
        flat
        className={twJoin(
          "text-success rounded-none py-1.5 normal-case px-0 gap-0 text-sm justify-between",
          voted === "upvote" && "hover:bg-success/10 bg-success/20",
        )}
        onClick={() => handlevote("upvote")}
      >
        <span className="w-2/3 inline-block text-center pl-2">
          {nFormatter(props.upvotes, 0)}
        </span>
        <span className="w-1/3 inline-block relative h-full">
          <ArrowUpIcon className="w-5 h-5 absolute top-0 -left-3" />
        </span>
      </Button>

      <h2 className="text-center text-xl text-primary font-extrabold">
        #{props.postNr}
      </h2>

      <Button
        flat
        className={twJoin(
          "text-error rounded-none py-1.5 normal-case px-0 gap-0 text-sm justify-between",
          voted === "downvote" && "hover:bg-error/10 bg-error/20",
        )}
        onClick={() => handlevote("downvote")}
      >
        <span className="w-2/3 inline-block text-center pl-2">
          {nFormatter(props.downvotes, 0)}
        </span>
        <span className="w-1/3 inline-block relative h-full">
          <ArrowDownIcon className="w-5 h-5 absolute top-0 -left-3" />
        </span>
      </Button>
    </div>
  );
}
