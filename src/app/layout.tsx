"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/ui";
import { DatabaseContext, DatabaseDispatchContext, useDb } from "@/collections";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NotificationCenter } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { db, dispatchDb } = useDb();

  console.log({ db });

  return (
    <html lang="en">
      <body className={inter.className}>
        <DatabaseContext.Provider value={db}>
          <DatabaseDispatchContext.Provider value={dispatchDb}>
            <Navbar title="Penalty" endContent={<NotificationCenter />} />
            {children}
          </DatabaseDispatchContext.Provider>
        </DatabaseContext.Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
