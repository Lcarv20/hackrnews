import { twJoin } from "tailwind-merge";

// This applies shadow and animations to all small floats (menu, dropdown, tooltip, ...)
export const floatClasses = twJoin(
  "shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]",
  "will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade",
  "data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade",
  "data-[side=left]:animate-slideRightAndFade",
);

