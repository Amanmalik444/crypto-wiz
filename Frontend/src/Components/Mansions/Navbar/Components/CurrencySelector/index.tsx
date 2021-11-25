import * as React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import toast from "react-hot-toast";

import { setCurrentCurrency as currencyAction } from "../../../../../Store/Actions/CurrencyAction";
import { currencies, convertToLabelValuePair } from "../../../../../utils";

type mapDispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = mapDispatchProps;

const CurrencySelector: React.FC<IProps> = ({ setCurrentCurrency }) => {
  return (
    <Select
      onChange={(e) => {
        setCurrentCurrency(e?.value);
        toast.success(`Currency set to ${e?.value}`);
      }}
      options={convertToLabelValuePair(currencies)}
      defaultValue={{ label: "inr", value: "inr" }}
      className="text-white"
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary25: "rgba(255,255,255,0.25)",
          primary50: "rgba(255,255,255,0.50)",
          primary75: "rgba(255,255,255,0.75)",
          primary: "rgba(255,255,255,1)",
          neutral0: "rgba(25,25,25,1)",
          neutral5: "rgba(255,255,255,0.05)",
          neutral10: "rgba(255,255,255,0.1)",
          neutral20: "rgba(255,255,255,0.2)",
          neutral30: "rgba(255,255,255,0.3)",
          neutral40: "rgba(255,255,255,0.4)",
          neutral50: "rgba(255,255,255,0.5)",
          neutral60: "rgba(255,255,255,0.6)",
          neutral70: "rgba(255,255,255,0.7)",
          neutral80: "rgba(255,255,255,0.8)",
          neutral90: "rgba(255,255,255,0.9)",
        },
      })}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentCurrency: (currency: string | undefined) =>
    dispatch(currencyAction(currency)),
});

export default connect(null, mapDispatchToProps)(CurrencySelector);
