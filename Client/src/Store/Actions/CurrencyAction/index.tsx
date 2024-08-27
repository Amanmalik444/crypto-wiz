import { Dispatch } from "redux";
import * as actionTypes from "./types";

type dispatchType = Dispatch<actionTypes.CurrencyDispatchTypes>;

export const setCurrentCurrency = (currency: string | undefined) => {
  return {
    type: "SET_CURRENCY",
    payload: currency,
  };
};
