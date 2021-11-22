import * as React from "react";
import toast from "react-hot-toast";
// import { useHistory } from "react-router-dom";

import ShareModal from "../../../Modals/ShareModal";

interface IProps {
  coinName?: string;
  coinId?: string;
}

const ShareIcon = ({ coinName = "the coin", coinId = "id" }: IProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const tipRef: any = React.createRef();

  const enter = () => {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginBottom = "17px";
  };

  const leave = () => {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginBottom = "10px";
  };

  return (
    <>
      <div className="relative flex items-center">
        <div
          className="absolute bg-gradient-to-t from-black to-gray-700
        text-white py-2 rounded-lg transition-all duration-300 bottom-6 -left-9
        flex flex-row justify-center w-24 text-sm font-medium z-20 opacity-0"
          ref={tipRef}
        >
          <div className="bg-black h-3 w-3 absolute top-7 transform rotate-45" />
          Share Coin
        </div>
        <i
          className="bx bx-share-alt transform transition
        duration-300 cursor-pointer text-gray-900"
          style={{
            textShadow:
              "0 0px 3px rgba(255,255,255,0.5), 0 0px 1px rgba(255,255,255,1)",
          }}
          onClick={() => {
            setOpenModal(true);
          }}
          onMouseEnter={enter}
          onMouseLeave={leave}
        />
      </div>
      {openModal && (
        <ShareModal
          coinName={coinName}
          coinId={coinId}
          toggleModal={toggleModal}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default ShareIcon;
