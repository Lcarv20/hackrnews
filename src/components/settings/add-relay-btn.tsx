"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="shrink-0"
            type="submit"
            size="icon"
            disabled={pending}
          >
            {pending ? <LoaderIcon className="animate-spin" /> : <PlusIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add relay</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const LoaderIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-loader-pinwheel", className)}
    >
      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
      <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
      <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
