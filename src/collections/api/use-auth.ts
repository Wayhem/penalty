import { useDb } from "../db/use-db";

export const useAuth = () => {
  const { db } = useDb();

  const isAuthed = typeof db.user?.cookie !== "undefined";

  return { isAuthed };
};
