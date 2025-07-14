import * as React from "react";
import { useHistory } from "react-router-dom";

import useData from "./data";
import { staticLogo } from "utils";
import CurrencySelector from "Components/Molecules/Navbar/Components/CurrencySelector";
import UserNavAccountOptions from "Components/Molecules/Navbar/Components/UserNavAccountOptions";
import StatusIndicator from "Components/Molecules/Navbar/Components/StatusIndicator";
import NavLinks from "Components/Molecules/Navbar/Components/Navlinks";

const Navbar: React.FC = () => {
  const [leftPanelVisible, setLeftPanelVisibility] =
    React.useState<boolean>(false);
  const history = useHistory();

  const {
    Logout,
    states,
    setMessageModalVisibility,
    setConnectModalVisibility,
    setSettingsModalVisibility,
  } = useData(history);
  const {
    status,
    messageModalVisibile,
    connectModalVisibile,
    settingsModalVisibile,
    isLoggedIn,
  } = states;

  return (
    <div className="fixed z-20 w-full">
      <div className="bg-black">
        <div className="relative w-full flex items-center justify-between md:justify-around p-3">
          <i
            className={`ring-2 ring-inset bx bx-${
              leftPanelVisible ? "x ring-gray-500" : "menu  ring-gray-800"
            } text-2xl px-2 rounded-md text-gray-400 cursor-pointer
            hover:text-white hover:bg-gray-700 md:hidden`}
            onClick={() => {
              setLeftPanelVisibility(!leftPanelVisible);
            }}
          />
          <div className="flex items-center justify-center md:justify-start">
            <img
              className="block h-8 w-auto"
              src={staticLogo}
              alt="Crypto Wiz"
            />
            <div className="hidden md:flex flex-row flex-wrap justify-center items-center ml-4">
              <NavLinks />
              <div className="ml-4 mr-4 w-px h-8 bg-gray-800 rounded-lg" />
              <CurrencySelector />
              <StatusIndicator status={status} className="ml-4" />
            </div>
          </div>
          <UserNavAccountOptions
            Logout={Logout}
            messageModalVisibile={messageModalVisibile}
            connectModalVisibile={connectModalVisibile}
            settingsModalVisibile={settingsModalVisibile}
            setMessageModalVisibility={setMessageModalVisibility}
            setConnectModalVisibility={setConnectModalVisibility}
            setSettingsModalVisibility={setSettingsModalVisibility}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>

      <div
        className={`${
          leftPanelVisible
            ? "block translate-x-0"
            : "invisible -translate-x-full"
        } bg-black px-4 py-5 md:hidden transition-all duration-200 transform ease-out
        flex flex-col justify-center items-center gap-2 text-center z-20 w-full absolute`}
      >
        <NavLinks className="w-full" />
        <CurrencySelector className="px-3 py-2" />
        <StatusIndicator status={status} className="w-full" />
      </div>
      <div
        className={`${leftPanelVisible ? "block" : "invisible"} z-10 antialiased
          bottom-0 top-0 right-0 left-0 fixed`}
        onClick={() => {
          setLeftPanelVisibility(false);
        }}
      />
    </div>
  );
};

export default Navbar;
