"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { twMerge } from "tailwind-merge";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      cn={twMerge}
      richColors
      toastOptions={{
        // unstyled: true,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:border-surface3 group-[.toaster]:shadow-lg",
          title: "group-[.toaster]:text-textColor",
          description: "group-[.toast]:text-textColor/85",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-textColor",
          cancelButton: "group-[.toast]:bg-error group-[.toast]:text-textColor",
          error:
            "group-[.toast]:bg-primary group-[.toast]:text-textColor bg-cyan-500",
          success: "group-[.toast]:bg-success group-[.toast]:text-textColor bg-red-500",
          warning: "group-[.toast]:bg-warn group-[.toast]:text-textColor",
          info: "group-[.toast]:bg-info group-[.toast]:text-textColor",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
