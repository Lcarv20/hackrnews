import Divider from "@ui/divider";
import Logo from "@components/logo";
import { twJoin } from "tailwind-merge";
import MenuLinks from "./menu-links";
import React from "react";
import { cookies } from "next/headers";
import ThemeMenu from "./theme-menu";
import MobileDrawer from "./mobile-drawer";
import DesktopDrawer from "./desktop-drawer";
import Accounts from "./accounts";
import Link from "next/link";
import { OutlineButton } from "@/ui/buttons";
import { User2Icon } from "lucide-react";
import { getSession } from "@/utils/session";

export default async function Navbar() {
  const isPinned = cookies().get("pinned")?.value === "true" ?? false;
  const session = await getSession();
  console.log(session);

  return (
    <>
      <nav
        className={twJoin(
          "bg-surface1 drop-shadow-md rounded-3xl p-4 px-6",
          "md:p-[1rem] md:px-[2rem] flex items-center",
          "sticky top-0 z-10 float-border",
        )}
      >
        <Logo />
        <MenuLinks />
        <div className="lg:hidden ml-auto">
          <MobileDrawer />
        </div>
        <div className={twJoin("hidden ml-auto mr-6", isPinned && "lg:block")}>
          {isPinned && <ThemeMenu />}
        </div>

        <div className="hidden gap-4 justify-center items-center lg:flex">
          {!session ? <Login /> : <Accounts profiles={session} />}

          {/* <Accounts profiles={profilesVal} /> */}
          <Divider vertical />

          <DesktopDrawer />
        </div>
      </nav>
    </>
  );
}

function Login() {
  return (
    <Link href="/login">
      <OutlineButton variant="primary" className="flex -space-x-4">
        <User2Icon className="h-5 w-5" />
        Login
      </OutlineButton>
    </Link>
  );
}
