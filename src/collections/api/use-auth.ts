"use client";
import { useContext } from "react";
import { DatabaseContext } from "../db/use-db";

export const useAuth = () => {
  const db = useContext(DatabaseContext);

  const isAuthed = typeof db.user?.cookie !== "undefined";

  return { isAuthed, username: db.user.username };
};
