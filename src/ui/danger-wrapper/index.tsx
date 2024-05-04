/**
 * Copyright 2024 Name
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import React from "react";
import { twMerge } from "tailwind-merge";
import styles from "./styles.module.css";

export default function DangerWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge(styles.stripes, "p-0.5 rounded-lg", className)}>
      <div className="bg-background rounded-lg">{children}</div>
    </div>
  );
}
