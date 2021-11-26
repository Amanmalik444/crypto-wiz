import * as React from "react";

import { Button } from ".";

interface IProps {
  className?: string;
  dropImage?: any;
  dropHeader?: string;
}

const Selector: React.FC<IProps> = ({
  children,
  className = "",
  dropImage,
  dropHeader = "Open Dropdown",
}) => {
  const [openDrop, setOpenDrop] = React.useState<boolean>(false);
  return (
    <>
      <div className={`relative inline-block text-left ${className}`}>
        <div
          className="cursor-pointer shadow-sm"
          onClick={() => {
            setOpenDrop(!openDrop);
          }}
        >
          {dropImage ? (
            <img
              className="rounded-full w-8 h-8 transition duration-200 ease-out
            border-2 border-gray-500 hover:opacity-95 hover:border-gray-300"
              src={dropImage}
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
          className={`${openDrop ? "block" : "invisible"} z-20 antialiased
          bottom-0 top-0 right-0 left-0 fixed`}
          onClick={() => {
            setOpenDrop(false);
          }}
        />
        <div
          className={`${
            openDrop ? "block scale-100" : "invisible scale-50"
          } z-30 origin-top-right absolute right-0 w-36 text-gray-700 text-sm
          rounded-md shadow-lg bg-white divide-y divide-gray-200
          transition-all duration-100 ease-in transform mt-2`}
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

export default Selector;
