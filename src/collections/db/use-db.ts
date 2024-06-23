"use client";
import { createContext, Dispatch, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { TransactionType, TransactionStatus, type Database } from "./database";
// Credentials would for sure not be handled like this on a normal app ()
const defaultNonPersistentData = {
  user: {},
  users: {
    ["1337Slayer"]: {
      username: "1337Slayer",
      password: "totallysecurepassword",
      tokens: 10,
    },
    friendlyUser420: {
      username: "friendlyUser420",
      password: "totallysecurepassword2",
      tokens: 10,
    },
    satoshi: {
      username: "satoshi",
      password: "idontspeakjapanese",
      tokens: 10,
    },
    admin: {
      username: "admin",
      password: "pass",
      tokens: 10,
    },
  },
  transactions: {
    admin: [
      {
        id: "1",
        targetUsername: "satoshi",
        tokens: 5,
        status: TransactionStatus.approved,
        type: TransactionType.inbound,
      },
      {
        id: "2",
        targetUsername: "satoshi",
        tokens: 5,
        status: TransactionStatus.approved,
        type: TransactionType.outbound,
      },
    ],
    satoshi: [
      {
        id: "1",
        targetUsername: "admin",
        tokens: 5,
        status: TransactionStatus.approved,
        type: TransactionType.outbound,
      },
      {
        id: "2",
        targetUsername: "admin",
        tokens: 5,
        status: TransactionStatus.approved,
        type: TransactionType.inbound,
      },
    ],
  },
  requests: {
    admin: [
      {
        id: "1",
        requester: "satoshi",
        tokens: 2,
      },
      {
        id: "2",
        requester: "1337Slayer",
        tokens: 1,
      },
    ],
  },
};

export const DatabaseContext = createContext<Database>(
  defaultNonPersistentData
);
export const DatabaseDispatchContext = createContext<Dispatch<Action> | null>(
  () => {}
);

export enum DatabaseActionsTypes {
  LOGIN = "userLogin",
  REGISTER = "userRegister",
  LOGOUT = "userLogout",
  REQUEST_TRANSACTION = "requestTransaction",
  APPROVE_TRANSACTION = "approveTransaction",
  DECLINE_TRANSACTION = "declineTransaction",
}

type Action = {
  type: DatabaseActionsTypes;
  payload: any;
};

const dbReducer = (state: Database, action: Action) => {
  const newId = uuidv4();

  switch (action.type) {
    case DatabaseActionsTypes.LOGIN:
      return { ...state, user: { ...action.payload, cookie: "AUTHED" } };
    case DatabaseActionsTypes.REGISTER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.username]: { ...action.payload },
        },
        user: {
          ...action.payload,
          cookie: "AUTHED",
        },
      };
    case DatabaseActionsTypes.LOGOUT:
      return {
        ...state,
        user: {},
      };
    case DatabaseActionsTypes.REQUEST_TRANSACTION:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.requestedUser]: [
            ...(state.requests[action.payload.requestedUser] || []),
            {
              id: uuidv4(),
              requester: action.payload.username,
              tokens: action.payload.tokens,
            },
          ],
        },
      };
    case DatabaseActionsTypes.APPROVE_TRANSACTION:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.acceptingUser]: [
            ...(state.requests[action.payload.acceptingUser]?.filter(
              ({ id }) => id !== action.payload.id
            ) || []),
          ],
        },
        transactions: {
          ...state.transactions,
          [action.payload.acceptingUser]: [
            ...(state.transactions[action.payload.acceptingUser] || []),
            {
              id: newId,
              targetUsername: action.payload.requesterUser,
              tokens: action.payload.tokens,
              status: TransactionStatus.approved,
              type: TransactionType.outbound,
            },
          ],
          [action.payload.requesterUser]: [
            ...(state.transactions[action.payload.requesterUser] || []),
            {
              id: newId,
              targetUsername: action.payload.acceptingUser,
              tokens: action.payload.tokens,
              status: TransactionStatus.approved,
              type: TransactionType.inbound,
            },
          ],
        },
        users: {
          ...state.users,
          [action.payload.requesterUser]: {
            ...state.users[action.payload.requesterUser],
            tokens:
              state.users[action.payload.requesterUser].tokens +
              action.payload.tokens,
          },
          [action.payload.acceptingUser]: {
            ...state.users[action.payload.acceptingUser],
            tokens:
              (state.users[action.payload.acceptingUser].tokens as number) -
              action.payload.tokens,
          },
        },
        user: {
          ...state.user,
          tokens: (state.user.tokens as number) - action.payload.tokens,
        },
      };
    case DatabaseActionsTypes.DECLINE_TRANSACTION:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.acceptingUser]: [
            ...(state.requests[action.payload.acceptingUser]?.filter(
              ({ id }) => id !== action.payload.id
            ) || []),
          ],
        },
        transactions: {
          ...state.transactions,
          [action.payload.acceptingUser]: [
            ...(state.transactions[action.payload.acceptingUser] || []),
            {
              id: newId,
              targetUsername: action.payload.requesterUser,
              tokens: action.payload.tokens,
              status: TransactionStatus.declined,
              type: TransactionType.outbound,
            },
          ],
          [action.payload.requesterUser]: [
            ...(state.transactions[action.payload.requesterUser] || []),
            {
              id: newId,
              targetUsername: action.payload.acceptingUser,
              tokens: action.payload.tokens,
              status: TransactionStatus.declined,
              type: TransactionType.inbound,
            },
          ],
        },
      };
    default:
      return state;
  }
};
export function useDb() {
  const [db, dispatchDb] = useReducer<
    (state: Database, action: Action) => Database
  >(dbReducer, defaultNonPersistentData);

  return { db, dispatchDb };
}
