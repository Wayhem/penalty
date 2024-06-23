export type User = { username?: string; password?: string; tokens?: number };

export interface AuthedUser extends User {
  cookie?: string;
}

export enum TransactionStatus {
  approved = "Approved",
  declined = "Declined",
}

export enum TransactionType {
  inbound = "Inbound",
  outbound = "Outbound",
}

export type Request = {
  id: string;
  requester: string;
  tokens: number;
};

export type Transaction = {
  id: string;
  targetUsername: string;
  tokens: number;
  status: TransactionStatus;
  type: TransactionType;
};

export type Database = {
  user: AuthedUser;
  users: Record<string, User>;
  requests: Record<string, Request[]>;
  transactions: Record<string, Transaction[]>;
};
