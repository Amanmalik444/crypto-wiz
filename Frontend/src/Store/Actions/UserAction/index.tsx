import { Dispatch } from "redux";
import * as actionTypes from "./types";

type dispatchType = Dispatch<actionTypes.UserDispatchTypes>;

export const setUser = (user: any) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};
