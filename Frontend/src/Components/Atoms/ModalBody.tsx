import * as React from "react";

interface IProps {
  className?: string;
}

const Modal: React.FC<IProps> = ({ children, className }) => {
  return (
    <>
      <div className={`p-3 ${className || ""}`}>{children}</div>
    </>
  );
};

export default Modal;
