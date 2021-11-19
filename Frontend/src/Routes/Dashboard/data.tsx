import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IState {
  data: [];
  loading: boolean;
}

const useData = () => {
  const [data, setData] = React.useState<IState["data"]>([]);
  const [loading, setLoading] = React.useState<IState["loading"]>(false);

  let userId = JSON.parse(localStorage.getItem("user") as string)._id;
  // let favId = String(userId) + "@SastaSalt" + String(id);

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
        setData(res.data);
      })
      .catch(() => {
        toast.error("An error occured");
        setLoading(false);
      });
  }, []);

  const states = { data, loading };

  return { states };
};

export default useData;
