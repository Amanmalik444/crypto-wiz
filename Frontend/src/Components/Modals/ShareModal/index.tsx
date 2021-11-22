import toast from "react-hot-toast";

import { Modal, ModalBody, ModalHeader } from "../../Bricks";

interface IProps {
  coinName?: string;
  coinId?: string;
  toggleModal: () => void;
  openModal: boolean;
}

const ShareModal = ({
  coinName = "the coin",
  coinId = "id",
  toggleModal = () => {},
  openModal = false,
}: IProps) => {
  let link = `https://www.coingecko.com/en/coins/${coinId}`;

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("link copied"))
      .catch(() => toast.error("error copying link"));
  };

  return (
    <>
      <Modal
        className="bg-white rounded-lg"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Share {coinName}</ModalHeader>
        <ModalBody>
          <div className="flex flex-row flex-wrap align-center justify-center my-4">
            <p className="mx-2 text-xl text-blue-500 hover:text-blue-700">
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

export default ShareModal;
