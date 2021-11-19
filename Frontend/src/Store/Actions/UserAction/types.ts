export interface ISetUser {
  type: "SET_USER";
  payload: any;
}

export type UserDispatchTypes = ISetUser;
