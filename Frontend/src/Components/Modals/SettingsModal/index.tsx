import * as React from "react";

import { Modal, ModalBody, ModalHeader, Spinner, Button } from "../../Bricks";
import UpdateProfileForm from "./Components/updateProfileForm";

interface IProps {
  openModal: any;
  closeModal: () => void;
}

const SettingsModal: React.FC<IProps> = ({ openModal, closeModal }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [updProfileFormVisib, setUpdProfileFormVisib] =
    React.useState<boolean>(false);

  return (
    <>
      <Modal
        className="bg-white rounded-lg"
        isOpen={openModal}
        toggle={closeModal}
      >
        <ModalHeader toggle={closeModal}>Settings</ModalHeader>
        <ModalBody className="w-full flex items-start justify-center overflow-auto">
          {loading ? (
            <Spinner height="4xl my-28" />
          ) : (
            <>
              {!updProfileFormVisib && (
                <h1
                  className="cursor-pointer p-4 font-bold underline text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    setUpdProfileFormVisib(true);
                  }}
                >
                  Update Profile details
                </h1>
              )}
              {updProfileFormVisib && (
                <UpdateProfileForm
                  goBack={() => {
                    setUpdProfileFormVisib(false);
                  }}
                />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default SettingsModal;
