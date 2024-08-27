export interface ISetCurrency {
  type: "SET_CURRENCY";
  payload: string | undefined;
}

export type CurrencyDispatchTypes = ISetCurrency;
