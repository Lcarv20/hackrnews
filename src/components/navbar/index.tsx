import Logo from "@/components/logo";
import { twJoin } from "tailwind-merge";
import MenuLinks from "./menu-links";
import React from "react";
import { getSession } from "@/utils/session";
import OptionsMenu from "./options-menu";

export default async function Navbar() {
  const session = await getSession();

  return (
    <>
      <nav
        className={twJoin(
          "bg-background drop-shadow-md rounded-lg p-4 px-6 border",
          "md:p-2 md:px-[2rem] flex items-center",
          "sticky top-0 z-10 float-border"
        )}
      >
        <Logo />
        <div className="grow ml-4">
          <MenuLinks />
        </div>
        {/* <div className="lg:hidden ml-auto"> */}
        {/*   <MobileDrawer /> */}
        {/* </div> */}

        <div className="hidden gap-4 justify-center items-center lg:flex">
          <OptionsMenu session={session} />
        </div>
      </nav>
    </>
  );
}
