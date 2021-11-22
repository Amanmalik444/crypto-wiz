import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface IState {
  data: [];
  loading: boolean;
  order: string;
  category: string | null;
  page: number;
  favData: string[];
  refetchFavData: number;
}

const useData = (currency: string | undefined) => {
  const [data, setData] = React.useState<IState["data"]>();
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [order, setOrder] = React.useState<IState["order"]>("market_cap_desc");
  const [page, setPage] = React.useState<IState["page"]>(1);
  const [category, setCategory] = React.useState<IState["category"]>("all_cat");
  const [favData, setFavData] = React.useState<IState["favData"]>([]);
  const [flagNumberFavData, setFlagNumberFavData] =
    React.useState<IState["refetchFavData"]>(0);

  const increaseFavFlagNumber = () => {
    setFlagNumberFavData(flagNumberFavData + 1);
  };

  const fetchFavData = () => {
    let userId = JSON.parse(localStorage.getItem("user") as string)._id;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/favourite/fetchFavListUser`,
        { userId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then((res: any) => {
        setFavData(res.data);
      })
      .catch(() => {
        toast.error("An error occured");
      });
  };

  React.useEffect(() => {
    fetchFavData();
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (flagNumberFavData !== 0) {
      setFlagNumberFavData(0);
      fetchFavData();
    }
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${
          category !== "all_cat" ? `&category=${category}` : ""
        }&order=${order}&per_page=24&page=${page}&sparkline=false`
      )
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Trouble reaching the server");
        setLoading(false);
        console.log(err);
      });
  }, [currency, order, category, page]);

  const states = { data, loading, category, page, favData };

  return { states, setOrder, setPage, setCategory, increaseFavFlagNumber };
};

export default useData;
