import Switch from "@/ui/switch";
import Image from "next/image";
import React from "react";
import { twJoin } from "tailwind-merge";

const RelaysMock = [
  {
    displayName: "damus.io",
    avatar: "https://picsum.photos/200",
  },
  {
    displayName: "relay.example/wellord.com",
    avatar: "https://picsum.photos/200",
  },
  {
    displayName: "relay.example/simple.com",
    avatar: "https://picsum.photos/200",
  },
  {
    displayName: "relay.example/simple.net",
    avatar: "https://picsum.photos/200",
  },
];

export default function RelaySettings() {
  return (
    <div>
      <h1 className="text-md mb-2">Relay Settings</h1>
      <div className="flex flex-col gap-4">
        {RelaysMock.map((relay) => (
          <div
            key={relay.displayName}
            className={twJoin("bg-surface1 space-y-5  rounded-lg", "p-3")}
          >
            {/* Header */}
            <div className={twJoin("flex items-center")}>
              <Image
                src={relay.avatar}
                alt={relay.displayName}
                width={200}
                height={200}
                className="w-10 h-10 rounded-full"
              />
              <p className="ml-4 font-bold">{relay.displayName}</p>
            </div>

            <form className="flex justify-between">
              <Switch label="read" className="uppercase" />
              <Switch label="write" className="uppercase" />
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
