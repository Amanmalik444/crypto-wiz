import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TabSwitch,
} from "../../Bricks";
import Users from "./Components/users";

interface IProps {
  openModal: any;
  defaultTab?: string;
  closeModal: () => void;
}

const ConnectModal: React.FC<IProps> = ({
  defaultTab,
  openModal,
  closeModal,
}) => {
  const [data, setData] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string | undefined>(
    defaultTab
  );

  const userId = JSON.parse(localStorage.getItem("user") as string)?._id || "";

  const fetch = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/connect/${activeTab}TabList`,
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

  React.useEffect(() => {
    setLoading(true);
    setData([]);
    fetch();
  }, [activeTab]);

  return (
    <>
      <Modal
        className="bg-white rounded-lg w-10/12 
        xs:w-11/12 sm:w-3/4 md:w-7/12 lg:w-5/12 xl:w-4/12"
        isOpen={openModal}
        toggle={closeModal}
      >
        <ModalHeader toggle={closeModal} hr={true} className="pb-0">
          <TabSwitch
            active={activeTab}
            setActive={setActiveTab}
            options={["Follow", "Requests", "Followers"]}
          />
        </ModalHeader>
        <ModalBody className="w-full h-96 overflow-auto">
          {loading ? (
            <Spinner height="4xl my-28" />
          ) : (
            <>
              {data.map((u: any) => {
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
                    />
                  );
                } else if (activeTab === "Requests" && u.requestorId) {
                  return (
                    <Users
                      name={u.requestorId.name}
                      userName={u.requestorId.userName}
                      coins={u.requestorId.favouriteCoins.length}
                      createdAt={u.requestorId.createdAt}
                      toConnectId={u.requestorId._id}
                      userId={userId}
                      useCase={"Accept"}
                    />
                  );
                } else if (activeTab === "Followers" && u.requestorId) {
                  return (
                    <Users
                      name={u.requestorId.name}
                      userName={u.requestorId.userName}
                      coins={u.requestorId.favouriteCoins.length}
                      createdAt={u.requestorId.createdAt}
                      toConnectId={u.requestorId._id}
                      userId={userId}
                      useCase={"Remove"}
                    />
                  );
                } else {
                  return <div />;
                }
              })}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConnectModal;
