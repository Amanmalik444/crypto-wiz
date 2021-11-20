import * as React from "react";

interface IProps {
  options: string[];
  setActive: any;
  active: string;
}

const TabSwitch: React.FC<IProps> = ({ options, active, setActive }) => {
  return (
    <div className="w-full mt-2 pl-2">
      {options.map((option) => {
        return (
          <button
            onClick={() => {
              setActive(option);
            }}
            className={`px-4 text-gray-400 border-gray-200 border-b-4
            transition duration-500 ease-out hover:text-gray-500 hover:border-gray-300
            ${
              option === active &&
              "border-gray-500 text-gray-700 hover:border-gray-600 hover:text-gray-800"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
