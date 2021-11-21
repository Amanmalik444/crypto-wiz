import * as React from "react";
import userImg from "../../utils/user.png";

interface IProps {
  className?: string;
}

const Dropdown: React.FC<IProps> = ({ children, className }) => {
  const [openDrop, setOpenDrop] = React.useState<boolean>(false);
  return (
    <>
      <div className="relative inline-block text-left">
        <img
          className="rounded-full w-8 h-8 cursor-pointer
            border-2 border-gray-500 shadow-sm hover:opacity-90"
          src={userImg}
          onClick={() => {
            setOpenDrop(!openDrop);
          }}
        />
        <div
          className={`${openDrop ? "block" : "invisible"} z-20 antialiased
          bottom-0 top-0 right-0 left-0 fixed`}
          onClick={() => {
            setOpenDrop(false);
          }}
        />
        <div
          className={`${
            openDrop ? "block" : "invisible"
          } z-30 origin-top-right absolute right-0 w-36 mt-2 text-gray-700 text-sm
          rounded-md shadow-lg bg-white divide-y divide-gray-200
          transition-all duration-100 ease-in`}
          // transform translate-y-2 translate-y-6
          onClick={(e) => {
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
