import * as React from "react";

import { Button } from "Components/Atoms";

interface IProps {
  className?: string;
  onChange: (e: any) => void;
  options: {
    label: string | Element | JSX.Element | number;
    value: string | number;
  }[];
  defaultValue: any;
  bgc?: string;
  color?: string;
  colorh?: string;
  rounded?: string;
  outline?: boolean;
  border?: string;
  borderh?: string;
}

const Selector: React.FC<IProps> = ({
  className = "",
  onChange = () => {},
  options = [{ label: "", value: "" }],
  defaultValue = { label: "", value: "" },
  bgc = "white",
  color = "gray-700",
  colorh = "gray-900",
  rounded = "lg",
  outline = true,
  border = "",
  borderh = "",
}) => {
  const [openSelector, setOpenSelector] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<{
    label: string | Element | JSX.Element | number;
    value: string | number;
  }>(defaultValue);
  return (
    <>
      <div className={`relative inline-block text-left  ${className}`}>
        <div
          className={`${openSelector ? "block" : "invisible"} z-20
          bottom-0 top-0 right-0 left-0 fixed`}
          onClick={() => {
            setOpenSelector(false);
          }}
        />
        <Button
          bgc={bgc}
          color={color}
          colorh={colorh}
          className={`px-4 py-2 cursor-pointer shadow-sm 
          flex flex-row items-center justify-between text-sm
          focus:ring-1 ring-gray-600 border-${border} hover:border-${borderh}`}
          onClick={() => {
            setOpenSelector(!openSelector);
          }}
          rounded={rounded}
          outline={outline}
        >
          {current.label || "Open Selector"}{" "}
          <div className={`w-px h-4 bg-${color} opacity-20 ml-4 mr-2`} />
          <i className="bx bx-chevron-down" />
        </Button>
        <div
          className={`${
            openSelector ? "block scale-100" : "invisible scale-50"
          } transition-all duration-100 ease-in transform mt-2 max-h-64 overflow-auto
          z-30 origin-top absolute right-0 w-full divide-y divide-gray-200
          rounded-md shadow-lg bg-${bgc} ring-1 ring-${border}`}
          onClick={(e) => {
            setOpenSelector(false);
            e.stopPropagation();
          }}
        >
          {options.map((pair, i) => (
            <p
              className={`px-4 py-3 bg-${
                current.value === pair.value ? color : bgc
              } text-sm text-${
                current.value === pair.value ? bgc : color
              } hover:bg-${colorh}
              hover:text-${bgc} cursor-pointer`}
              onClick={() => {
                onChange(pair);
                setCurrent(pair);
              }}
            >
              {pair.label}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Selector;
