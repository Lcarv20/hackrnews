import React from "react";
import Appearance from "./appearance-sheet";
import Relays from "./relays-sheet";

export default function MobileSettings() {
  return (
    <div className="lg:hidden space-y-2">
      <Appearance />
      <Relays />
    </div>
  );
}
