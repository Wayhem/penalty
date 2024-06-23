"use client";
import { useAuth } from "@/collections/api/use-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Wrapper } from "./styles";
import { RequestModal, TransactionTable } from "@/components";

export default function Home() {
  const { isAuthed } = useAuth();

  if (!isAuthed) redirect("/login");

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary fallback={<div>something went wrong</div>}>
        <Wrapper className="overflow-x-auto">
          <TransactionTable />
          <RequestModal />
        </Wrapper>
      </ErrorBoundary>
    </Suspense>
  );
}
