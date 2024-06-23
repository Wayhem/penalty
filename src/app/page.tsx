"use client";

import { DatabaseContext } from "@/collections";
import { useAuth } from "@/collections/api/use-auth";
import { redirect } from "next/navigation";
import { Suspense, useContext } from "react";

export default function Home() {
  const { isAuthed } = useAuth();
  const db = useContext(DatabaseContext);

  if (!isAuthed) redirect("/login");

  console.log({ db });

  return <Suspense fallback={<div>loading...</div>}>hello</Suspense>;
}
