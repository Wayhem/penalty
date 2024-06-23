export type User = { username?: string; password?: string };

export interface AuthedUser extends User {
  cookie?: string;
}

export type Database = { user: AuthedUser; users: Record<string, User> };
