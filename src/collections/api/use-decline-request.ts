import { useContext } from "react";
import {
  DatabaseActionsTypes,
  DatabaseContext,
  DatabaseDispatchContext,
} from "../db/use-db";

export const useDeclineRequest = () => {
  const dispatchDb = useContext(DatabaseDispatchContext);
  const db = useContext(DatabaseContext);

  if (!dispatchDb) return { declineRequest: () => {} };

  const declineRequest = (
    username: string,
    tokens: number,
    requesterUser: string,
    requestId: string
  ) => {
    dispatchDb({
      type: DatabaseActionsTypes.DECLINE_TRANSACTION,
      payload: {
        acceptingUser: username,
        tokens,
        requesterUser,
        id: requestId,
      },
    });
  };

  return { declineRequest };
};
