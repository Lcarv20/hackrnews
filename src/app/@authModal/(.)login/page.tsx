import React from "react";
import { Modal } from "./modal";
import Login from "@/components/login";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = getSession();

  if (!!session) {
    redirect("/");
  }
  return (
    <Modal>
      <Login></Login>
    </Modal>
  );
}
