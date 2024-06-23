import { useContext } from "react";
import {
  DatabaseActionsTypes,
  DatabaseContext,
  DatabaseDispatchContext,
} from "../db/use-db";

export const useApproveRequest = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);
  const db = useContext(DatabaseContext);

  if (!dispatchDb) return { approveRequest: () => {} };

  const approveRequest = (
    username: string,
    tokens: number,
    requesterUser: string,
    requestId: string
  ) => {
    const foundUser = db.users[username];

    if (foundUser && foundUser.tokens) {
      if (foundUser.tokens < tokens) {
        throw Error("You don't have enough tokens");
      }

      dispatchDb({
        type: DatabaseActionsTypes.APPROVE_TRANSACTION,
        payload: {
          acceptingUser: username,
          tokens,
          requesterUser,
          id: requestId,
        },
      });

      return {};
    }

    throw Error("User not available");
  };

  return { approveRequest };
};
