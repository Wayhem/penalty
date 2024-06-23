import { DatabaseActionsTypes, useDb } from "../db/use-db";

export const useRegister = () => {
  const { dispatchDb } = useDb();

  const register = (username: string, password: string) => {
    dispatchDb({
      type: DatabaseActionsTypes.REGISTER,
      payload: { username, password },
    });
  };

  return { register };
};
