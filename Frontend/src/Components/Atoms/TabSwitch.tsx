import * as React from "react";

interface IProps {
  options: string[];
  setActive: any;
  active: string;
}

const TabSwitch: React.FC<IProps> = ({ options, active, setActive }) => {
  return (
    <div className="h-12 w-60 p-1 mt-2 pl-2">
      {options.map((option) => {
        return (
          <button
            onClick={() => {
              setActive(option);
            }}
            className={`px-4 text-gray-400 border-b-4 border-gray-200
            transition duration-500 ease-out
            ${option === active && "border-gray-500 text-gray-700"}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
