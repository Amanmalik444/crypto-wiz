import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Modal,
  ModalBody,
  ModalHeader,
  Loader,
  TabSwitch,
  NoDataFetched,
} from "Components/Atoms";
import Users from "Modals/ConnectModal/Components/users";
import { REACT_APP_SERVER_LINK } from "utils";

interface IProps {
  openModal: any;
  defaultTab?: string;
  toggleModal: () => void;
}

const ConnectModal: React.FC<IProps> = ({
  defaultTab,
  openModal,
  toggleModal,
}) => {
  const [data, setData] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string | undefined>(
    defaultTab
  );

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [openModal]);

  React.useEffect(() => {
    if (openModal) {
      setLoading(true);
      setData([]);
      fetch();
    }
  }, [activeTab, openModal]);

  const userId = JSON.parse(localStorage.getItem("user") as string)?._id || "";

  const fetch = () => {
    axios
      .post(
        `${REACT_APP_SERVER_LINK}/connect/${activeTab}TabList`,
        { userId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        className="bg-white rounded-lg w-10/12 
        xs:w-11/12 sm:w-3/4 md:w-7/12 lg:w-5/12 xl:w-4/12"
        isOpen={openModal}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal} hr={true} className="pb-0">
          <TabSwitch
            active={activeTab}
            setActive={setActiveTab}
            options={["Follow", "Requests", "Followers"]}
          />
        </ModalHeader>
        <ModalBody className="w-full h-96 overflow-auto">
          {loading ? (
            <Loader size="3" width="12" />
          ) : (
            <>
              {data && data.length > 0 ? (
                data.map((u: any) => {
                  if (activeTab === "Follow" && !u.requestorId) {
                    return (
                      <Users
                        name={u.name}
                        userName={u.userName}
                        coins={u.favouriteCoins.length}
                        createdAt={u.createdAt}
                        toConnectId={u._id}
                        userId={userId}
                        useCase={"Follow"}
                        openModal={openModal}
                      />
                    );
                  } else if (u.requestorId) {
                    return (
                      <Users
                        name={u.requestorId.name}
                        userName={u.requestorId.userName}
                        coins={u.requestorId.favouriteCoins.length}
                        createdAt={u.requestorId.createdAt}
                        toConnectId={u.requestorId._id}
                        userId={userId}
                        useCase={activeTab === "Requests" ? "Accept" : "Remove"}
                        openModal={openModal}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })
              ) : (
                <NoDataFetched
                  errorMessage={
                    activeTab === "Follow"
                      ? "No user found"
                      : activeTab === "Requests"
                      ? "No active request"
                      : "No follower found"
                  }
                />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConnectModal;
