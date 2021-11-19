import * as actionTypes from "../Actions/CurrencyAction/types";

export type IState = {
  currency: string | undefined;
};

const initialState: IState = { currency: "inr" };

const reducer = (
  state = initialState,
  action: actionTypes.CurrencyDispatchTypes
): IState => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
