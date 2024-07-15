"use server";

import { cookies } from "next/headers";

export async function setPreferedSource(source: string) {
  console.log("here I am: ", source);
  // cookies().set({
  //   name: "prefered-source",
  //   value: source,
  //   path: "/",
  //   httpOnly: true,
  // });
}
