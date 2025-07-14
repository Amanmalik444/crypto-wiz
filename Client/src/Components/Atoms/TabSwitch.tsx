import * as React from "react";

interface IProps {
  options: string[];
  setActive: any;
  active: string | undefined;
}

const TabSwitch: React.FC<IProps> = ({ options, active, setActive }) => {
  return (
    <div
      className="w-11/12 mt-2 pl-2 flex flex-row flex-wrap items-center 
    justify-start overflow-x-auto"
    >
      {options.map((option, index) => {
        return (
          <div className="flex flex-row items-center justify-center">
            {index !== 0 && <div className="w-px h-6 bg-gray-200"></div>}
            <button
              onClick={() => {
                setActive(option);
              }}
              className={`px-4 pb-2 text-gray-400 border-white border-b-2
            transition duration-500 ease-out hover:text-gray-600 hover:border-gray-400
            ${
              option === active &&
              "border-gray-600 text-gray-800 hover:border-gray-700 hover:text-gray-900"
            }`}
            >
              {option}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TabSwitch;
