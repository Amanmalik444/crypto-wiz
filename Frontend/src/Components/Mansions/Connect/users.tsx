import * as React from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "../../Bricks";

interface IProps {
  name: string;
  userName: string;
  coins?: number;
  createdAt: string;
  userId?: string;
  toConnectId?: string;
  useCase: string;
}

const View: React.FC<IProps> = ({
  name,
  userName,
  coins = 0,
  createdAt,
  userId = "",
  useCase = "Follow",
  toConnectId = "",
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<string>(useCase);

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/fetch${useCase}TabStatus`,
        { userId, toConnectId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setStatus(res.data || "Error");
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  }, [useCase]);

  const sendRequest = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/${useCase}`,
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
          useCase === "Follow"
            ? "Request sent successfully"
            : "Request Accepted"
        );
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-between items-center">
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
            classes={`w-24 h-7 bg-gray-700 my-1 rounded-full ${
              status !== useCase && "opacity-40"
            }`}
            onClick={sendRequest}
            disabled={status !== useCase || loading}
            loading={loading}
          >
            {status}
          </Button>
        </div>
      </div>
      <hr className="w-11/12 m-3" />
    </div>
  );
};

export default View;
