import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IState {
  favData: [];
  loading: boolean;
  followersNumber: number;
}

const useData = () => {
  const [favData, setFavData] = React.useState<IState["favData"]>([]);
  const [followersNumber, setFollowersNumber] =
    React.useState<IState["followersNumber"]>(0);
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [connectModalVisibile, setConnectModalVisibility] =
    React.useState<boolean>(false);
  const [profilePicsModalVisibile, setProfilePicsModalVisibility] =
    React.useState<boolean>(false);
  const [defaultTab, setDefaultTab] = React.useState<
    "Follow" | "Requests" | "Followers"
  >("Follow");

  const user = JSON.parse(localStorage.getItem("user") as string);

  const onProfilePicClick = (profilePicIndex: number) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/updateProfilePic`,
        { userId: user._id, profilePicIndex },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        console.log(res.data);
        setProfilePicsModalVisibility(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile Pic changed successfully");
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/fetchFollowersAndFavouritesByUserId`,
        { userId: user._id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        setLoading(false);
        setFavData(res.data.favData);
        setFollowersNumber(res.data.followersNumber);
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  }, []);

  const states = {
    favData,
    loading,
    followersNumber,
    connectModalVisibile,
    profilePicsModalVisibile,
    defaultTab,
    user,
  };

  return {
    states,
    onProfilePicClick,
    setConnectModalVisibility,
    setProfilePicsModalVisibility,
    setDefaultTab,
  };
};

export default useData;
