import { DatabaseActionsTypes, useDb } from "../db/use-db";

export const useLogout = () => {
  const { dispatchDb } = useDb();

  const register = () => {
    dispatchDb({
      type: DatabaseActionsTypes.LOGOUT,
      payload: {},
    });
  };

  return { register };
};
