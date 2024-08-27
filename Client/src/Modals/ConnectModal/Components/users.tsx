import * as React from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "Components/Bricks";

interface IProps {
  name: string;
  userName: string;
  coins: number;
  createdAt: string;
  userId: string;
  toConnectId: string;
  useCase: string;
  openModal: boolean;
}

const Users: React.FC<IProps> = ({
  name,
  userName,
  coins = 0,
  createdAt,
  userId = "",
  useCase = "Follow",
  toConnectId = "",
  openModal,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>("");

  React.useEffect(() => {
    if (openModal) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_LINK}/connect/fetch${useCase}TabStatus`,
          { userId, toConnectId },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("jwt") as string),
            },
          }
        )
        .then((res: any) => {
          setStatus(res.data || "Error");
        })
        .catch(() => {
          toast.error("An error occured");
        });
    }
  }, [useCase, openModal]);

  const sendRequest = (type: string) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/connect/${type}`,
        { userId, toConnectId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setStatus(res.data);
        toast.success(
          type === "Follow"
            ? "Request sent successfully"
            : type === "Accept"
            ? "Request Accepted"
            : type === "Unfollow"
            ? "Unfollowed"
            : useCase === "Followers"
            ? "Follower Removed"
            : "Request Removed"
        );
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex w-full flex-row items-center justify-center">
        <div
          className="flex flex-row items-center justify-between
      rounded-full sm:border w-11/12 px-4"
        >
          <div className="w-full flex flex-row justify-between items-center">
            <p
              className="text-xl truncate text-gray-600 w-20 
          mr-3 border-r border-gray-300 capitalize"
            >
              {name}
            </p>
            <div className="flex flex-col flex-wrap justify-center items-start">
              <p className="text-xs">{userName}</p>
              <p>
                {coins} {coins > 0 ? "coins" : "coin"} saved
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between items-end">
            <p className="mr-2 mt-1 text-xxs">
              Joined {moment(createdAt).fromNow()}
            </p>
            <Button
              rounded="lg"
              bgch="gray-500"
              bgc="white"
              color="white"
              colorh="white"
              className={`w-24 h-7 bg-gray-700 my-1 rounded-full ${
                status !== useCase && status !== "Unfollow" && "opacity-40"
              }`}
              onClick={() => {
                sendRequest(status === "Unfollow" ? "Unfollow" : useCase);
              }}
              disabled={
                (status !== useCase && status !== "Unfollow") || loading
              }
              loading={loading}
            >
              {status}
            </Button>
          </div>
        </div>
        {useCase === "Accept" && (
          <i
            className={`bx bx-trash ml-2 text-xl cursor-pointer`}
            onClick={() => {
              sendRequest("Remove");
            }}
          />
        )}
      </div>
      <hr className="w-11/12 m-3" />
    </div>
  );
};

export default Users;
