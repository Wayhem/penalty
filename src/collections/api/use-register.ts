import { useContext } from "react";
import { DatabaseActionsTypes, DatabaseDispatchContext } from "../db/use-db";

export const useRegister = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);

  if (!dispatchDb) return { register: () => {} };

  const register = (username: string, password: string) => {
    dispatchDb({
      type: DatabaseActionsTypes.REGISTER,
      payload: { username, password },
    });
  };

  return { register };
};
