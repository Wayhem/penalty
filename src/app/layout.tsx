"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/ui";
import {
  api,
  DatabaseContext,
  DatabaseDispatchContext,
  useDb,
} from "@/collections";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthed } = api.useAuth();
  const { db, dispatchDb } = useDb();

  const navbarElements = isAuthed ? "something" : <></>;

  return (
    <html lang="en">
      <body className={inter.className}>
        <DatabaseContext.Provider value={db}>
          <DatabaseDispatchContext.Provider value={dispatchDb}>
            <Navbar title="Penalty" endContent={navbarElements} />
            {children}
          </DatabaseDispatchContext.Provider>
        </DatabaseContext.Provider>
      </body>
    </html>
  );
}
