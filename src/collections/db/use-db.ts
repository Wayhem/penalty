import { useReducer } from "react";
import type { Database, User } from "./database";
// Credentials would for sure not be handled like this on a normal app ()
const defaultNonPersistentData = {
  user: {},
  users: {
    ["1337Slayer"]: {
      username: "1337Slayer",
      password: "totallysecurepassword",
    },
    friendlyUser420: {
      username: "friendlyUser420",
      password: "totallysecurepassword2",
    },
    satoshi: {
      username: "satoshi",
      password: "idontspeakjapanese",
    },
    admin: {
      username: "admin",
      password: "pass",
    },
  },
};

export enum DatabaseActionsTypes {
  LOGIN = "userLogin",
  REGISTER = "userRegister",
  LOGOUT = "userLogout",
}

type Action = {
  type: DatabaseActionsTypes;
  payload: User;
};

const dbReducer = (state: Database, action: Action) => {
  switch (action.type) {
    case DatabaseActionsTypes.LOGIN:
      return { ...state, user: { ...action.payload, cookie: "AUTHED" } };
    case DatabaseActionsTypes.REGISTER:
      return {
        ...state,
        users: {
          ...state.users,
          ...(action.payload.username && {
            [action.payload.username]: { ...action.payload },
          }),
        },
        user: {
          ...(action.payload.username && {
            ...action.payload,
            cookie: "AUTHED",
          }),
        },
      };
    case DatabaseActionsTypes.LOGOUT:
      return {
        ...state,
        user: {},
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
