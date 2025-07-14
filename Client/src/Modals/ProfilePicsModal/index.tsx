import { Modal, ModalBody, ModalHeader } from "Components/Atoms";
import { profilePics } from "utils";

interface IProps {
  toggleModal: () => void;
  openModal: boolean;
  onProfilePicClick?: (index: number) => void;
  modalHeader?: string;
  current?: number;
}

const ProfilePicsModal: React.FC<IProps> = ({
  toggleModal = () => {},
  openModal = false,
  onProfilePicClick = () => {},
  modalHeader = "",
  current,
}) => {
  return (
    <>
      <Modal
        className="bg-white rounded-lg w-10/12 
       xs:w-11/12 sm:w-3/4 md:w-7/12 lg:w-5/12 xl:w-4/12 overflow-auto"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>
          {modalHeader || "Profile pic"}
        </ModalHeader>
        <ModalBody>
          <div
            className="w-full flex flex-2 flex-wrap align-center 
          justify-center"
          >
            {profilePics.map((profile, index) => (
              <div
                style={{
                  backgroundImage: `url(${profile})`,
                }}
                className={`h-24 w-24 md:h-40 md:w-40 rounded-full m-2
                ring-4 ring-${
                  index === current ? "blue-400" : "yellow-100 cursor-pointer"
                } ring-inset bg-cover`}
                onClick={() => {
                  if (index !== current) {
                    onProfilePicClick(index);
                  }
                }}
              />
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProfilePicsModal;
