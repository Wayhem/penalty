import { DatabaseActionsTypes, useDb } from "../db/use-db";

export const useLogin = () => {
  const { db, dispatchDb } = useDb();

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
