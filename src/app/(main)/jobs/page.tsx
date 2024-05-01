'use client'
import { buttonVariants } from "@/components/ui/button";
import React from "react";

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="">
        Jobs
      </div>
      <button className={buttonVariants({ variant: "outline", shape: "circle" })}>HS</button>

      <div className="bg-warn text-warn-foreground">Warning</div>
      <div className="bg-success text-success-foreground">Success</div>
      <div className="bg-info text-info-foreground">Info</div>
      <div className="bg-destructive text-destructive-foreground">Destructive</div>


    </div>
  );
}
