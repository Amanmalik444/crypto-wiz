import * as React from "react";
import toast from "react-hot-toast";

import { profilePics } from "utils";
import { Dropdown } from "Components/Bricks";
import { SettingsModal, ConnectModal, MessageModal } from "Modals";

interface IProps {
  Logout: () => void;
  messageModalVisibile: boolean;
  connectModalVisibile: boolean;
  settingsModalVisibile: boolean;
  setMessageModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const UserNavAccountOptions: React.FC<IProps> = ({
  Logout = () => {},
  messageModalVisibile,
  connectModalVisibile,
  settingsModalVisibile,
  setMessageModalVisibility,
  setConnectModalVisibility,
  setSettingsModalVisibility,
  isLoggedIn,
}) => {
  const profilePicIndex = isLoggedIn
    ? JSON.parse(localStorage.getItem("user") as string)?.profilePicIndex
    : "";

  return (
    <>
      <Dropdown dropImage={profilePics[profilePicIndex]} dropHeader="Guest">
        <div>
          <p
            className="block px-4 py-2 hover:text-gray-900 rounded-t-lg
                    hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              isLoggedIn
                ? setConnectModalVisibility(true)
                : toast.error("Please Login to use this feature");
            }}
          >
            <i className="bx bx-notification mr-2" />
            Requests
          </p>
          <p
            className="block px-4 py-2 hover:text-gray-900 
                      hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              isLoggedIn
                ? setMessageModalVisibility(true)
                : toast.error("Please Login to use this feature");
            }}
          >
            <i className="bx bx-message mr-2" />
            Messages
          </p>
          <p
            className="block px-4 bg-white py-2 
                      hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              isLoggedIn
                ? setSettingsModalVisibility(true)
                : toast.error("Please Login to use this feature");
            }}
          >
            <i className="bx bx-cog mr-2" />
            Settings
          </p>
        </div>
        <p
          className="block rounded-b-lg hover:text-gray-900 
                      hover:bg-gray-100 cursor-pointer px-4 py-2 pb-3"
          onClick={Logout}
        >
          <i className="bx bx-log-out mr-2" />
          {isLoggedIn ? "Log out" : "Log in"}
        </p>
      </Dropdown>
      {isLoggedIn && (
        <>
          <MessageModal
            openModal={messageModalVisibile}
            toggleModal={() => {
              setMessageModalVisibility(false);
            }}
          />
          <ConnectModal
            openModal={connectModalVisibile}
            toggleModal={() => {
              setConnectModalVisibility(false);
            }}
            defaultTab={"Requests"}
          />
          <SettingsModal
            openModal={settingsModalVisibile}
            toggleModal={() => {
              setSettingsModalVisibility(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default UserNavAccountOptions;
