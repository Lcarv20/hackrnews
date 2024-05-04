'use client'
import React from "react";
import { Modal } from "./modal";
import Login from "@/components/login";
import Modal from "@/components/server-modal";

export default async function Page() {
  return (
    <Modal>
      <Login isModal></Login>
    </Modal>
  );
}
