import * as actionTypes from "../Actions/UserAction/types";

export type IState = {
  user: any;
};

const initialState: IState = { user: {} };

const reducer = (
  state = initialState,
  action: actionTypes.UserDispatchTypes
): IState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
