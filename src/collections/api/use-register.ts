import { useContext } from "react";
import {
  DatabaseActionsTypes,
  DatabaseContext,
  DatabaseDispatchContext,
} from "../db/use-db";

export const useRegister = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);
  const db = useContext(DatabaseContext);

  if (!dispatchDb) return { register: () => {} };

  const register = (username: string, password: string) => {
    const foundUser = db.users[username];

    if (foundUser) {
      throw Error("User already exists");
    }

    dispatchDb({
      type: DatabaseActionsTypes.REGISTER,
      payload: { username, password, tokens: 10 },
    });
  };

  return { register };
};
