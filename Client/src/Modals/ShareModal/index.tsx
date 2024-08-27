import * as React from "react";

import { Modal, ModalBody, ModalHeader, Loader } from "Components/Bricks";
import SocialIconsForShare from "Modals/ShareModal/Components/socialIconsForShare";
import SendCoinsToFollowingUsers from "Modals/ShareModal/Components/sendCoinsToFollowingUsers";
import { useData } from "Modals/ShareModal/data";

interface IProps {
  coinName?: string;
  coinId?: string;
  toggleModal: () => void;
  openModal: boolean;
}

const ShareModal: React.FC<IProps> = ({
  coinName = "the coin",
  coinId = "id",
  toggleModal = () => {},
  openModal = false,
}) => {
  const {
    states,
    copyLink,
    setShareNote,
    setSelectedUserIds,
    sendCoinsWithinApp,
  } = useData({
    coinId,
    coinName,
    openModal,
  });

  const { link, shareNote, followingUsers, selectedUserIds, loading } = states;

  return (
    <>
      <Modal
        className="bg-white rounded-lg md:w-1/2 lg:w-4/12 max-w-11/12"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Share {coinName}</ModalHeader>
        <ModalBody>
          <div className="w-full flex flex-row align-center justify-between mb-2">
            <p className="px-2 text-xl text-blue-500 hover:text-blue-700 break-all">
              {link}
            </p>
            <i
              className="bx bx-copy mx-2 text-2xl cursor-pointer 
              text-green-500 hover:text-green-700"
              onClick={copyLink}
            />
          </div>
          <hr />
          {loading ? (
            <Loader className="my-16" />
          ) : (
            followingUsers &&
            followingUsers?.length > 0 && (
              <SendCoinsToFollowingUsers
                followingUsers={followingUsers}
                selectedUserIds={selectedUserIds}
                setSelectedUserIds={setSelectedUserIds}
                sendCoinsWithinApp={sendCoinsWithinApp}
              />
            )
          )}
          <hr />
          <SocialIconsForShare shareNote={shareNote} link={link} />
          <input
            className="w-full shadow rounded py-2 px-3 bg-gray-400 placeholder-gray-800 text-sm
            transition duration-500 outline-none ring-gray-800 ring-opacity-40 text-gray-800 bg-opacity-20
            focus:ring-2 focus:text-black focus:bg-opacity-30 focus:placeholder-gray-900"
            id="shareNote"
            placeholder="Enter a note to share"
            value={shareNote}
            onChange={(e) => setShareNote(e.target.value)}
            required
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ShareModal;
