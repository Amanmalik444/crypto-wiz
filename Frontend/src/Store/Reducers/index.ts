import { combineReducers } from "redux";
import CurrencyReducer from "./CurrencyReducer";
import UserReducer from "./UserReducer";

export interface IApplicationState {
  currency: string | undefined;
  user: any;
}

export default combineReducers({
  currency: CurrencyReducer,
  user: UserReducer,
});
