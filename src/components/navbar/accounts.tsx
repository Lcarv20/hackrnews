"use client";

import { Profile } from "@/utils/actions/auth";
import { Button } from "@ui/buttons";
import { logout } from "@/utils/actions/auth";

export default function Accounts({ profiles }: { profiles: Profile[] }) {
  return (
    <Button
      // onClick={async function () {
      //   await logout();
      // }}
      variant="ghost"
      className="flex -space-x-4"
    >
      {profiles?.map((account) => (
        <img
          key={account.relay}
          className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
          width={8}
          height={8}
          src={account.picture}
          alt="Profile Picus"
        />
      ))}
    </Button>
  );
}
