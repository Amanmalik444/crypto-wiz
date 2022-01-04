import * as React from "react";

import { Button } from "Components/Bricks";

interface IProps {
  className?: string;
  dropImage?: any;
  dropHeader?: string;
}

const Dropdown: React.FC<IProps> = ({
  children,
  className = "",
  dropImage,
  dropHeader = "Open Dropdown",
}) => {
  const [openDrop, setOpenDrop] = React.useState<boolean>(false);
  return (
    <>
      <div className={`relative text-left ${className}`}>
        <div
          className={`${openDrop ? "block" : "invisible"} z-20 antialiased
          bottom-0 top-0 right-0 left-0 fixed`}
          onClick={() => {
            setOpenDrop(false);
          }}
        />
        <div
          className="cursor-pointer shadow-sm"
          onClick={() => {
            setOpenDrop(!openDrop);
          }}
        >
          {dropImage ? (
            <img
              className={`rounded-full w-9 h-9  ${
                openDrop ? "ring-2 ring-gray-100" : "ring-1 ring-gray-500"
              }`}
              src={dropImage}
              alt="Dropdown"
            />
          ) : (
            <Button
              rounded="lg"
              bgch="gray-700"
              bgc="white"
              color="white"
              colorh="white"
              className="px-2 py-1 bg-gray-900"
            >
              {dropHeader}
            </Button>
          )}
        </div>

        <div
          className={`${
            openDrop ? "block scale-100 animate-expandlg" : "invisible scale-50"
          } z-30 origin-top-right absolute right-0 w-36 text-gray-700 text-sm
          rounded-md shadow-lg bg-white divide-y divide-gray-200 mt-2
          transition-all duration-100 ease-in transform`}
          onClick={(e) => {
            setOpenDrop(false);
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
