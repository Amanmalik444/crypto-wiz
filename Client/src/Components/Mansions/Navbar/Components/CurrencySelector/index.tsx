import * as React from "react";
import { connect } from "react-redux";
import toast from "react-hot-toast";

import { setCurrentCurrency as currencyAction } from "Store/Actions/CurrencyAction";
import { currencies, convertToLabelValuePair } from "utils";
import { Selector } from "Components/Bricks";

type mapDispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = mapDispatchProps & { className?: string };

const CurrencySelector: React.FC<IProps> = ({
  setCurrentCurrency,
  className,
}) => {
  return (
    <div className={className}>
      <Selector
        onChange={(e) => {
          setCurrentCurrency(e?.value);
          toast.success(`Currency set to ${e?.value}`);
        }}
        options={convertToLabelValuePair(currencies)}
        defaultValue={{ label: "inr", value: "inr" }}
        bgc="gray-900"
        color="gray-300"
        colorh="gray-100"
        border="gray-600"
        borderh="gray-500"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentCurrency: (currency: string | undefined) =>
    dispatch(currencyAction(currency)),
});

export default connect(null, mapDispatchToProps)(CurrencySelector);
