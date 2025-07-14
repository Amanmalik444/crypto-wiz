export const setCurrentCurrency = (currency: string | undefined) => {
  return {
    type: "SET_CURRENCY",
    payload: currency,
  };
};
