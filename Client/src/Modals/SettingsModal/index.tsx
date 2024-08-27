import * as React from "react";
import toast from "react-hot-toast";

import { Modal, ModalBody, ModalHeader } from "Components/Bricks";
import ProfileEditForm from "Modals/SettingsModal/Components/profileEditForm";

interface IProps {
  openModal: any;
  toggleModal: () => void;
}

const SettingsModal: React.FC<IProps> = ({ openModal, toggleModal }) => {
  const [updProfileFormVisib, setUpdProfileFormVisib] =
    React.useState<boolean>(false);
  const [chngPassFormVisib, setChngPassFormVisib] =
    React.useState<boolean>(false);
  const [delAccountFormVisib, setDelAccountFormVisib] =
    React.useState<boolean>(false);

  return (
    <>
      <Modal
        className="bg-white rounded-lg"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Settings</ModalHeader>
        <ModalBody className="w-full flex flex-col items-start pb-6 justify-center overflow-auto">
          <>
            {!(
              chngPassFormVisib ||
              updProfileFormVisib ||
              delAccountFormVisib
            ) && (
              <>
                <h1
                  className="cursor-pointer p-4 font-bold underline text-blue-500 hover:text-blue-800"
                  onClick={() => {
                    setUpdProfileFormVisib(true);
                  }}
                >
                  Update Profile details
                </h1>
                <h1
                  className="cursor-pointer p-4 font-bold underline text-blue-500 hover:text-blue-800"
                  onClick={() => {
                    setChngPassFormVisib(true);
                  }}
                >
                  Change Password
                </h1>
                <h1
                  className="cursor-pointer p-4 font-bold underline text-blue-500 hover:text-blue-800"
                  onClick={() => {
                    toast.success("WOHOOO I won't let you go...");
                  }}
                >
                  Delete Account
                </h1>
              </>
            )}

            {(chngPassFormVisib || updProfileFormVisib) && (
              <ProfileEditForm
                goBack={() => {
                  updProfileFormVisib
                    ? setUpdProfileFormVisib(false)
                    : setChngPassFormVisib(false);
                }}
                useCase={
                  updProfileFormVisib
                    ? "updateProfile"
                    : chngPassFormVisib
                    ? "changePassword"
                    : "deleteAccount"
                }
              />
            )}
          </>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SettingsModal;
