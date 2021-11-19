import * as React from "react";
import axios from "axios";

interface IState {
  data: [];
  loading: boolean;
  order: string;
  category: string | null;
  page: number;
}

const useData = (currency: string | undefined) => {
  const [data, setData] = React.useState<IState["data"]>();
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [order, setOrder] = React.useState<IState["order"]>("market_cap_desc");
  const [page, setPage] = React.useState<IState["page"]>(1);
  const [category, setCategory] = React.useState<IState["category"]>("all_cat");

  React.useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        console.log(err);
      });
  }, [currency, order, category, page]);

  const states = { data, loading, category, page };

  return { states, setOrder, setPage, setCategory };
};

export default useData;
