import { useContext } from "react";
import {
  DatabaseActionsTypes,
  DatabaseContext,
  DatabaseDispatchContext,
} from "../db/use-db";

export const useCreateRequest = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);
  const db = useContext(DatabaseContext);

  if (!dispatchDb) return { createRequest: () => {} };

  const createRequest = (
    username: string,
    tokens: number,
    requestedUser: string
  ) => {
    const foundUser = db.users[username];

    if (foundUser) {
      dispatchDb({
        type: DatabaseActionsTypes.REQUEST_TRANSACTION,
        payload: { username, tokens, requestedUser },
      });
      return {};
    }

    throw Error("User not found");
  };

  return { createRequest };
};
