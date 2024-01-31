"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";

import { FirebaseAuthContext } from "@/providers/firebase-auth-provider";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(FirebaseAuthContext);

  if (!user) {
    redirect("/sign-in");
  }

  redirect(`/admin`);

  return <>{children}</>;
}
