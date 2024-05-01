"use client";

import { Profile, logout } from "@/utils/actions/auth";
import { LogOut, Settings2Icon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export default function Accounts({ profile }: { profile: Profile }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          shape: "circle",
          size: "icon",
          variant: "ghost",
        })}
      >
        <Avatar className="ring-2 ring-secondary h-8 w-8">
          <AvatarImage src={profile.picture} />
          <AvatarFallback>{profile.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/profile/${profile.publickey}`}>
          <DropdownMenuItem>
            <Settings2Icon className="mr-2 h-4 w-4" />
            <span>Manage</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:bg-destructive/20 focus:text-red-600"
          onClick={async () => await logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
