import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <div>Page</div>;
}
