"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/ui";
import { DatabaseContext, DatabaseDispatchContext, useDb } from "@/collections";
import { DatabaseActionsTypes } from "@/collections/db/use-db";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { db, dispatchDb } = useDb();

  console.log({ db });

  const navbarElements = db.user.username ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li
          onClick={() =>
            dispatchDb({ type: DatabaseActionsTypes.LOGOUT, payload: {} })
          }
        >
          <a>Logout</a>
        </li>
      </ul>
    </div>
  ) : (
    <></>
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <DatabaseContext.Provider value={db}>
          <DatabaseDispatchContext.Provider value={dispatchDb}>
            <Navbar title="Penalty" endContent={navbarElements} />
            {children}
          </DatabaseDispatchContext.Provider>
        </DatabaseContext.Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
