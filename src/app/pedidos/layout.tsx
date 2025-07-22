"use client";

import { NavContent } from "@/components/Layout/NavContent/component";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <NavContent minW={"full"} px="0">
      {children}
    </NavContent>
  );
}
