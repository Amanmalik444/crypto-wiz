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

  let userId = JSON.parse(localStorage.getItem("user") as string)._id;

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/favourite/fetchByUserId`,
        { userId },
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

  const states = { favData, loading, followersNumber };

  return { states };
};

export default useData;
