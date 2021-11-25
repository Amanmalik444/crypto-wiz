import * as React from "react";
import Select from "react-select";
import { Toggle } from "tailwind-mobile/react";
import toast from "react-hot-toast";

import { dayOptionsCoinPage } from "../../../../../utils";

interface IProps {
  setDays: any;
  setType: any;
}

const GraphOptions: React.FC<IProps> = ({ setDays, setType }) => {
  const [checked, setChecked] = React.useState(true);

  if (checked) {
    setType("candlestick");
  } else {
    setType("area");
  }

  return (
    <div
      className="flex flex-row items-center 
    justify-center gap-12"
    >
      <div
        className="flex flex-row items-center 
      justify-center gap-2"
      >
        <i
          className={`bx bx-pulse cursor-pointer text-xl ${
            checked ? "text-gray-300" : "text-gray-900"
          }`}
          onClick={() => {
            setChecked(false);
          }}
        />
        <Toggle
          className="flex items-center justify-center py-2 
        border-1 border-gray-100 shadow-lg"
          colors={{ bg: "bg-gray-600" }}
          checked={checked}
          onChange={(e) => {
            setChecked(!checked);
            toast.success(`Graph set to ${checked ? `Area` : `CandleStick`}`);
          }}
        />
        <i
          className={`bx bx-equalizer cursor-pointer text-xl ${
            checked ? "text-gray-900" : "text-gray-300"
          }`}
          onClick={() => {
            setChecked(true);
          }}
        />
      </div>
      <Select
        onChange={(e) => {
          setDays(e?.value);
          toast.success(`Showing graph for ${e?.label}`);
        }}
        options={dayOptionsCoinPage}
        defaultValue={{ label: "7 days", value: 7 }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
        })}
      />
    </div>
  );
};

export default GraphOptions;
