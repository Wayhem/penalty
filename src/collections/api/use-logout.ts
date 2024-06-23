import { useContext } from "react";
import { DatabaseActionsTypes, DatabaseDispatchContext } from "../db/use-db";

export const useLogout = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);

  if (!dispatchDb) return { logout: () => {} };

  const logout = () => {
    dispatchDb({
      type: DatabaseActionsTypes.LOGOUT,
      payload: {},
    });
  };

  return { logout };
};
