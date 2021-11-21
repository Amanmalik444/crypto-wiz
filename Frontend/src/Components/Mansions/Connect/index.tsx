import * as React from "react";

import { Button } from "../../Bricks";
import ConnectModal from "./Components/ConnectModal";

interface IProps {
  defaultTab?: string;
  className?: string;
}

const Connect: React.FC<IProps> = ({
  defaultTab,
  children,
  className = "",
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string | undefined>(
    defaultTab
  );

  const closeModal = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setOpenModal(true);
        }}
        className={className}
      >
        {children || (
          <Button
            rounded="lg"
            bgch="gray-800"
            bgc="white"
            color="gray-100"
            colorh="white"
            classes="w-28 h-8 bg-gray-600"
          >
            Connect
          </Button>
        )}
      </div>
      {openModal && (
        <ConnectModal
          openModal={openModal}
          closeModal={closeModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  );
};

export default Connect;
