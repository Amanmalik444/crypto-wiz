import * as React from "react";
import Select from "react-select";

import {
  orderOptionsCoinMarket,
  categoriesCoinMarket,
} from "../../../utils/optionsForSelectors";

interface IProps {
  setOrder: any;
  setCategory: any;
}

const Filters: React.FC<IProps> = ({ setOrder, setCategory }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-wrap flex-row items-center justify-center">
        <Select
          onChange={(e) => {
            setOrder(e?.value);
          }}
          options={orderOptionsCoinMarket}
          defaultValue={{
            label: (
              <p>
                <i className="bx bx-down-arrow-alt" /> Market cap
              </p>
            ),
            value: "market_cap_desc",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
          })}
          className="mx-3 my-2"
        />
        <Select
          onChange={(e) => {
            setCategory(e?.value);
          }}
          options={categoriesCoinMarket}
          defaultValue={{
            label: "All categories",
            value: "all_cat",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
          })}
          className="mx-3 my-2"
        />
      </div>
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black my-2" />
    </div>
  );
};

export default Filters;
