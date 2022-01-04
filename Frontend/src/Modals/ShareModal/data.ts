import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IProps {
  coinName?: string;
  coinId?: string;
  openModal: boolean;
}

interface IState {
  followingUsers:
    | {
        userId: {
          name: string;
          userName: string;
          profilePicIndex: number | string;
          _id: string;
        };
      }[]
    | undefined;
}

export const useData = ({ coinName, coinId, openModal }: IProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followingUsers, setFollowingUsers] =
    React.useState<IState["followingUsers"]>();
  const [shareNote, setShareNote] = React.useState<string>(
    `Hey, You should see this ${coinName}, I found on Crypto Wiz.`
  );
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  const jwtToken = localStorage.getItem("jwt");

  const user = jwtToken
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";
  const link = `${process.env.REACT_APP_HOSTED_LINK}/coin/${coinId}`;

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("link copied"))
      .catch(() => toast.error("error copying link"));
  };

  React.useEffect(() => {
    if (openModal && jwtToken) {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_LINK}/connect/FetchFollowingUsers`,
          { requestorId: user._id },
          {
            headers: {
              Authorization: JSON.parse(jwtToken as string),
            },
          }
        )
        .then((res: any) => {
          setLoading(false);
          setFollowingUsers(res.data);
        })
        .catch(() => {
          toast.error("An error occured");
          setLoading(false);
        });
    }
  }, [openModal]);

  const sendCoinsWithinApp = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/message/sendCoinsWithinApp`,
        {
          senderId: user._id,
          recipientIds: selectedUserIds,
          messageData: {
            shareNote,
            coinName,
            coinId,
          },
        },
        {
          headers: {
            Authorization: JSON.parse(jwtToken as string),
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        toast.success(res.data);
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  const states = {
    shareNote,
    link,
    loading,
    followingUsers,
    selectedUserIds,
  };

  return {
    states,
    setShareNote,
    copyLink,
    setSelectedUserIds,
    sendCoinsWithinApp,
  };
};
