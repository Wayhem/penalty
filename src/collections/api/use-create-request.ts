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
    const foundUser = db.users[requestedUser];

    if (foundUser && foundUser.tokens) {
      if (foundUser.tokens < tokens) {
        throw Error("Target doesn't have enough tokens");
      }

      dispatchDb({
        type: DatabaseActionsTypes.REQUEST_TRANSACTION,
        payload: { username, tokens, requestedUser },
      });
      return {};
    }

    throw Error("User not available");
  };

  return { createRequest };
};
