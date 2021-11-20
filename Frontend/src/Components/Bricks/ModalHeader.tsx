import * as React from "react";

interface IProps {
  toggle?: () => void;
  className?: string;
  hr?: boolean;
}

const Modal: React.FC<IProps> = ({
  children,
  toggle,
  className,
  hr = true,
}) => {
  return (
    <div className="flex flex-col items-center ml-2 p-3">
      <div
        className={`flex flex-row justify-between items-center
        bg-white text-2xl w-full
        rounded-tl-lg rounded-tr-lg p-2 ${className || ""}`}
      >
        <p className="font-semibold text-gray-400 cursor-default">
          {children || "Header"}
        </p>
        <i
          className="bx bx-x cursor-pointer text-gray-500 hover:text-black"
          onClick={toggle}
        />
      </div>
      {hr && <hr className="w-11/12" />}
    </div>
  );
};

export default Modal;
