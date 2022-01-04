import * as React from "react";

interface IProps {
  className?: string;
  colors: string[];
  checked: boolean;
  onChange: () => void;
}

const Toggle: React.FC<IProps> = ({
  className = "",
  colors = ["", ""],
  checked = false,
  onChange = () => {},
}) => {
  return (
    <>
      <div
        className={`bg-${
          checked ? colors[0] : colors[1]
        } relative ring ring-opacity-50 ring-${
          checked ? colors[0] : colors[1]
        } w-14 h-8 rounded-full transition duration-200 ease-out cursor-pointer
          ${className}`}
        onClick={onChange}
      >
        <div
          className={`absolute ${
            checked ? "translate-x-3" : "-translate-x-3"
          } left-4 top-1 bg-white w-6 h-6 rounded-full transform transition duration-200 ease-out`}
        />
      </div>
    </>
  );
};

export default Toggle;
