import { useContext } from "react";
import {
  DatabaseActionsTypes,
  DatabaseContext,
  DatabaseDispatchContext,
} from "../db/use-db";

export const useLogin = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);
  const db = useContext(DatabaseContext);

  if (!dispatchDb) return { login: () => {} };

  const login = (username: string, password: string) => {
    const foundUser = db.users[username];

    if (foundUser && password === foundUser.password) {
      dispatchDb({ type: DatabaseActionsTypes.LOGIN, payload: foundUser });
      return foundUser;
    }

    throw Error("User or password is incorrect");
  };

  return { login };
};
