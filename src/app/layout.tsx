import type { Metadata } from "next";
import "./globals.css";
import { twJoin } from "tailwind-merge";
import { josefinSans } from "@/ui/fonts";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    <html className="dark" lang="en">
      <body
        className={twJoin(
          "bg-background p-2 mx-auto md:p-4 text-textColor container",
          josefinSans.className,
          // TODO: add dark and light colors
        )}
      >
        <Navbar />
        {/* <Sidebar className='hidden' /> */}
        {children}
      </body>
    </html>
  );
}
