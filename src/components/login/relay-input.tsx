"use client";

import React, { useState } from "react";
import { CreatableInput } from "../ui/select-input";
import { useRelay } from "@/lib/hooks/relays";

type Option = {
  readonly label: string;
  readonly value: string;
};

export default function RelayInput({
  relays,
}: {
  relays: string[] | undefined;
}) {
  const { setRelay, pending } = useRelay();

  const options: Option[] | undefined = relays?.map((relay) => {
    return {
      label: relay.replace("wss://", ""),
      value: relay,
    };
  });

  return (
    <div className="space-y-6">
      <CreatableInput
        options={options}
        // isMulti
        isLoading={pending}
        onChange={(value) => {
          if (value?.value) {
            setRelay(value.value);
          }
        }}
      />
    </div>
  );
}
