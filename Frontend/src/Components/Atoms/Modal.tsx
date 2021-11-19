import * as React from "react";

interface IProps {
  isOpen?: boolean;
  toggle?: () => void;
  className?: string;
}

const Modal: React.FC<IProps> = ({
  isOpen = false,
  toggle,
  className,
  children,
}) => {
  return (
    <>
      <div
        className="z-30 main-modal flex justify-center items-center bg-gray-800 antialiased bg-opacity-20"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          ...(!isOpen && { visibility: "hidden" }),
        }}
        onClick={toggle}
      >
        <div
          className={`flex flex-col mx-auto rounded-lg border border-gray-300 shadow-xl ${
            className || ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
