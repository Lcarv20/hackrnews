"use client";

import React from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { THEMES } from "@/lib/constants";
import { Label } from "@/components/ui/label";

export default function Appearance() {
  const theme = useTheme();
  return (
    <main className="flex flex-col gap-8 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="theme" className="text-sm font-medium">
          Theme
        </Label>
        <Select value={theme.theme} onValueChange={theme.setTheme}>
          <SelectTrigger id="theme" className="w-[180px]">
            <SelectValue aria-label={"System"}>
              <span className="flex items-center gap-4 capitalize">
                {THEMES.filter((t) => t.name === theme.theme)[0].icon}
                {theme.theme}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="fontType" className="text-sm font-medium">
          Font Type
        </Label>
        <Select value={"mono"}>
          <SelectTrigger id="fontType" className="w-[180px]">
            <SelectValue aria-label={"System"}>
              <span className="flex items-center gap-4 capitalize">
                <h3 className="font-serif font-black">A</h3>
                {"Serif"}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mono">Mono</SelectItem>
            <SelectItem value="sans">Sans</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Accent Color</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="flex items-center gap-2 px-3 py-1"
              variant="outline"
            >
              <div className="h-5 w-5 rounded-full bg-[#0ea5e9]" />
              <span className="text-sm font-medium">Blue</span>
              <ChevronDownIcon className="ml-auto h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="grid w-fit grid-cols-4 gap-6 p-4"
          >
            <button className="h-8 w-8 rounded-lg bg-[#0ea5e9]" />
            <button className="h-8 w-8 rounded-lg bg-[#10b981]" />
            <button className="h-8 w-8 rounded-lg bg-[#f97316]" />
            <button className="h-8 w-8 rounded-lg bg-[#a855f7]" />
            <button className="h-8 w-8 rounded-lg bg-[#ef4444]" />
            <button className="h-8 w-8 rounded-lg bg-[#6366f1]" />
            <button className="h-8 w-8 rounded-lg bg-[#14b8a6]" />
            <button className="h-8 w-8 rounded-lg bg-[#f43f5e]" />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// export default function Appearance() {
//   const { theme: currTheme, setTheme } = useTheme();
//   const indicatorRef = useRef<HTMLDivElement>(null);
//
//   const themes = [
//     {
//       name: "system",
//       icon: <ComputerIcon className="h-6 w-6 text-muted-foreground" />,
//     },
//     {
//       name: "light",
//       icon: <SunIcon className="h-6 w-6 text-warn" />,
//     },
//     {
//       name: "dark",
//       icon: <MoonIcon className="h-6 w-6 text-info" />,
//     },
//   ];
//
//   const calculatePosition = useCallback((theme: string | undefined) => {
//     switch (theme) {
//       case "light":
//         return "100%";
//       case "dark":
//         return "200%";
//       default:
//         return 0;
//     }
//   }, []);
//
//   function handleThemeChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setTheme(e.target.value);
//
//     anime({
//       targets: indicatorRef.current,
//       translateX: [
//         calculatePosition(currTheme),
//         calculatePosition(e.target.value),
//       ],
//       easing: "spring(1, 90, 12, 5)",
//     });
//   }
//
//   useEffect(() => {
//     if (indicatorRef.current) {
//       indicatorRef.current.style.transform = `translateX(${calculatePosition(currTheme)})`;
//     }
//   }, []);
//
//   return (
//     <div className="space-y-8">
//       <fieldset>
//         <legend className="text-lg font-bold mb-2">Theme</legend>
//         <div className="rounded-xl p-2 bg-accent">
//           <div className="relative grid grid-cols-3 rounded-xl overflow-hidden">
//             <div
//               ref={indicatorRef}
//               className={cn(
//                 "absolute h-full w-1/3 bg-brand/30 shadow-lg text-brand-foreground",
//                 "transform rounded-xl",
//               )}
//             />
//             {themes.map((theme, idx) => (
//               <div key={theme.name}>
//                 <label
//                   key={theme.name}
//                   htmlFor={idx.toString()}
//                   className={cn(
//                     "col-span-1 w-full p-6 inline-flex cursor-pointer",
//                     "items-center flex-col gap-3 bg-transparent",
//                     "select-none",
//                   )}
//                 >
//                   <input
//                     id={idx.toString()}
//                     checked={currTheme === theme.name}
//                     onChange={handleThemeChange}
//                     type="radio"
//                     className="hidden"
//                     // name={theme.name}
//                     value={theme.name}
//                   />
//
//                   <span>{theme.icon}</span>
//                   <span>{theme.name}</span>
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//
//         <form></form>
//       </fieldset>
//
//       <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
//         <div>
//           <RadioGroupItem value="card" id="card" className="peer sr-only" />
//           <Label
//             htmlFor="card"
//             className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="mb-3 h-6 w-6"
//             >
//               <rect width="20" height="14" x="2" y="5" rx="2" />
//               <path d="M2 10h20" />
//             </svg>
//             Card
//           </Label>
//         </div>
//         <div>
//           <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
//           <Label
//             htmlFor="paypal"
//             className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//           >
//             <LockOpenIcon className="mb-3 h-6 w-6" />
//             Paypal
//           </Label>
//         </div>
//         <div>
//           <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
//           <Label
//             htmlFor="apple"
//             className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//           >
//             <AppleIcon className="mb-3 h-6 w-6" />
//             Apple
//           </Label>
//         </div>
//       </RadioGroup>
//     </div>
//   );
// }
