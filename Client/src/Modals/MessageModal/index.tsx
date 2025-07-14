import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Modal,
  ModalBody,
  ModalHeader,
  Loader,
  NoDataFetched,
  Tooltip,
} from "Components/Atoms";
import { profilePics } from "utils";

interface IProps {
  openModal: any;
  toggleModal: () => void;
}

const MessageModal: React.FC<IProps> = ({ openModal, toggleModal }) => {
  const [data, setData] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (openModal) {
      setLoading(true);
      fetch();
    }
  }, [openModal]);

  const userId = JSON.parse(localStorage.getItem("user") as string)?._id || "";

  const fetch = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/message/fetchMessagesForUser`,
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
        console.log(res.data);
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  const deleteMessage = (messageId: any) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/message/deleteMessage`,
        { userId, messageId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        toast.success("Message Deleted");
        fetch();
        console.log(res.data);
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
          Messages
        </ModalHeader>
        <ModalBody className="w-full h-96 overflow-auto">
          {loading ? (
            <Loader size="3" width="12" />
          ) : (
            <>
              {data.length > 0 ? (
                data.map((u: any) => (
                  <>
                    <div className="flex flex-row justify-between items-center">
                      <div
                        className="flex flex-row justify-start items-center
                      m-2 gap-2"
                      >
                        <div
                          style={{
                            backgroundImage: `url(${
                              profilePics[
                                Number(u.senderId.profilePicIndex) || 0
                              ]
                            })`,
                          }}
                          className="w-16 h-16 rounded-full
                        ring-4 ring-yellow-100 ring-inset bg-cover"
                        />
                        <div className="flex flex-col justify-center items-start">
                          <div className="flex flex-row justify-start items-center">
                            <p className="text-lg capitalize">
                              {u.senderId.name}
                            </p>
                            <p className="text-sm ml-2">
                              {u.senderId.userName}
                            </p>
                          </div>
                          <p className="text-xs">{u.messageData.shareNote}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end gap-2">
                        <p className="text-xxs whitespace-nowrap capitalize">
                          {moment(u.messageCreatedAt).fromNow()}
                        </p>
                        <Tooltip
                          tooltipLabel={`Go to ${
                            u.messageData.coinName || "Coin"
                          }`}
                          className="absolute right-10 mt-3"
                        >
                          <Link
                            to={`/coin/${u.messageData.coinId}`}
                            className="px-2 py-1 rounded-lg border-2 shadow 
                          bx bx-window-open text-lg"
                          />
                        </Tooltip>
                        <i
                          className="bx bx-trash text-lg ml-10 cursor-pointer"
                          onClick={() => {
                            deleteMessage(u._id);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <NoDataFetched errorMessage="No message found" />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default MessageModal;
