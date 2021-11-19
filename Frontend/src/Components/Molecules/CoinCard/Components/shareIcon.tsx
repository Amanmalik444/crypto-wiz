import * as React from "react";
import toast from "react-hot-toast";
// import { useHistory } from "react-router-dom";

import { Modal, ModalBody, ModalHeader } from "../../../Atoms";

interface IProps {
  coinName?: string;
  coinId?: string;
}

const ShareIcon = ({ coinName = "the coin", coinId = "id" }: IProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  let link = `https://www.coingecko.com/en/coins/${coinId}`;
  // const history = useHistory();

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("link copied"))
      .catch(() => toast.error("error copying link"));
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
      <Modal
        className="bg-white rounded-lg"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Share {coinName}</ModalHeader>
        <ModalBody>
          <div className="flex flex-row flex-wrap align-center justify-center my-4">
            <p
              className="mx-2 text-xl text-blue-500 hover:text-blue-700"
              // href={link}
            >
              {link}
            </p>
            <i
              className="bx bx-copy mx-2 text-2xl cursor-pointer 
              text-green-500 hover:text-green-700"
              onClick={copyLink}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ShareIcon;
