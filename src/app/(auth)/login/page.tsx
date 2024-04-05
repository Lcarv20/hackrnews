import Login from "@/components/login";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = getSession();

  if (!!session) {
    redirect("/");
  }

  return <Login />;
}
