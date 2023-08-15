/* user module */
export interface UserState {
  isLogin: boolean;
  user: Nullable<Recordable>;
  token: Nullable<string>;
}
