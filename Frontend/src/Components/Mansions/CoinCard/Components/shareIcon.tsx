import * as React from "react";

import { ShareModal } from "Modals";
import { Tooltip } from "Components/Bricks";

interface IProps {
  coinName?: string;
  coinId?: string;
}

const ShareIcon = ({ coinName = "the coin", coinId = "id" }: IProps) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Tooltip tooltipLabel={`Share ${coinName}`}>
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
        />
      </Tooltip>
      <ShareModal
        coinName={coinName}
        coinId={coinId}
        toggleModal={toggleModal}
        openModal={openModal}
      />
    </>
  );
};

export default ShareIcon;
