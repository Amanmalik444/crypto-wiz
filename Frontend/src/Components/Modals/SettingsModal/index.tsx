import * as React from "react";

import { Modal, ModalBody, ModalHeader } from "../../Bricks";
import ProfileEditForm from "./Components/profileEditForm";

interface IProps {
  openModal: any;
  closeModal: () => void;
}

const SettingsModal: React.FC<IProps> = ({ openModal, closeModal }) => {
  const [updProfileFormVisib, setUpdProfileFormVisib] =
    React.useState<boolean>(false);
  const [chngPassFormVisib, setChngPassFormVisib] =
    React.useState<boolean>(false);

  return (
    <>
      <Modal
        className="bg-white rounded-lg"
        isOpen={openModal}
        toggle={closeModal}
      >
        <ModalHeader toggle={closeModal}>Settings</ModalHeader>
        <ModalBody className="w-full flex flex-col items-start pb-6 justify-center overflow-auto">
          <>
            {!(chngPassFormVisib || updProfileFormVisib) && (
              <h1
                className="cursor-pointer p-4 font-bold underline text-blue-500 hover:text-blue-800"
                onClick={() => {
                  setUpdProfileFormVisib(true);
                }}
              >
                Update Profile details
              </h1>
            )}
            {updProfileFormVisib && (
              <ProfileEditForm
                goBack={() => {
                  setUpdProfileFormVisib(false);
                }}
                useCase={"updateProfile"}
              />
            )}
            {!(chngPassFormVisib || updProfileFormVisib) && (
              <h1
                className="cursor-pointer p-4 font-bold underline text-blue-500 hover:text-blue-800"
                onClick={() => {
                  setChngPassFormVisib(true);
                }}
              >
                Change Password
              </h1>
            )}
            {chngPassFormVisib && (
              <ProfileEditForm
                goBack={() => {
                  setChngPassFormVisib(false);
                }}
                useCase={"changePassword"}
              />
            )}
          </>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SettingsModal;
