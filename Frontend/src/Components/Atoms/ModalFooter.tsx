import * as React from "react";

interface IProps {
  classes?: string;
}

const Modal: React.FC<IProps> = ({ children, classes }) => {
  return (
    <>
      <div
        className={` p-2 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg ${
          classes || ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
