import * as React from "react";

interface IProps {
  className?: string;
}

const ModalBody: React.FC<IProps> = ({ children, className }) => {
  return (
    <>
      <div className={`p-3 z-50 ${className || ""}`}>{children}</div>
    </>
  );
};

export default ModalBody;
