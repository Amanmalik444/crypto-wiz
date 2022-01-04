import * as React from "react";
import toast from "react-hot-toast";

import { dayOptionsCoinPage } from "utils";
import { Selector, Toggle } from "Components/Bricks";

interface IProps {
  setDays: any;
  setType: any;
  type: string;
}

const GraphOptions: React.FC<IProps> = ({ setDays, setType, type }) => {
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
            type === "area" ? "text-blue-500" : "text-gray-300"
          }`}
          onClick={() => {
            setType("area");
            toast.success(`Graph set to area`);
          }}
        />
        <Toggle
          colors={["green-500", "blue-500"]}
          checked={type === "candlestick"}
          onChange={() => {
            toast.success(
              `Graph set to ${type === "candlestick" ? "area" : "candlestick"}`
            );
            setType(type === "candlestick" ? "area" : "candlestick");
          }}
        />
        <i
          className={`bx bx-equalizer cursor-pointer text-xl ${
            type === "candlestick" ? "text-green-500" : "text-gray-300"
          }`}
          onClick={() => {
            setType("candlestick");
            toast.success(`Graph set to candlestick`);
          }}
        />
      </div>
      <Selector
        onChange={(e) => {
          setDays(e?.value);
          toast.success(`Showing graph for ${e?.label}`);
        }}
        options={dayOptionsCoinPage}
        defaultValue={{ label: "7 days", value: 7 }}
        bgc="gray-50"
        color="gray-600"
        colorh="gray-800"
        border="gray-300"
        borderh="gray-600"
      />
    </div>
  );
};

export default GraphOptions;
