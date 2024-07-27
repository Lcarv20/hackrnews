import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center pointer-events-none p-1.5 rounded-full",
          "w-fit active:bg-brand/20 peer-active:bg-brand/20",
          props.disabled && "active:bg-transparent",
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "w-5 h-5 appearance-none shadow transition-colors pointer-events-auto",
            "border border-primary cursor-pointer rounded-sm",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-brand hover:shadow-brand",
            "checked:bg-brand checked:text-brand-foreground checked:border-brand",
            "checked:bg-no-repeat checked:bg-center",
            "checked:before:content-checkMark before:text-current",
            className,
          )}
          {...props}
        />
      </label>
    );
  },
);
Checkbox.displayName = "Input";

export { Checkbox };
