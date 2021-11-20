import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TabSwitch,
} from "../../Bricks";
import Users from "./users";

interface IProps {
  userId?: string;
  defaultTab: string;
}

const Connect: React.FC<IProps> = ({ userId = "", defaultTab, children }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<[]>([]);
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab);

  const closeModal = () => {
    setOpenModal(false);
  };

  const fetch = () => {
    setLoading(true);
    setData([]);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/${activeTab}TabList`,
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
    fetch();
  }, [activeTab]);

  return (
    <>
      <div
        onClick={() => {
          if (!loading) {
            setOpenModal(true);
            fetch();
          }
        }}
        className="cursor-pointer"
      >
        {children || (
          <Button
            rounded="lg"
            bgch="gray-800"
            bgc="white"
            color="gray-100"
            colorh="white"
            classes="w-28 h-8 bg-gray-600"
            disabled={loading}
          >
            Connect
          </Button>
        )}
      </div>
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
                if (activeTab === "Requests" && u.requestorId) {
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
                } else if (activeTab === "Follow" && !u.requestorId) {
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
                } else {
                  return <Spinner height="4xl my-28" />;
                }
              })}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Connect;
