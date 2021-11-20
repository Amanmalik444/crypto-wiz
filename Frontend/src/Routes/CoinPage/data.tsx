import * as React from "react";
import axios from "axios";

interface IState {
  data: any;
  loading: boolean;
}

const useData = (coinId: string | undefined) => {
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [data, setData] = React.useState<IState["data"]>({
    name: "",
    image: "",
    symbol: "",
    hashing_algorithm: "",
    block_time_in_minutes: "",
    last_updated: "",
    categories: "",
    coingecko_rank: "",
    market_cap_rank: "",
    developer_score: "",
    liquidity_score: "",
    coingecko_score: "",
    public_interest_score: "",
    sentiment_votes_down_percentage: "",
    sentiment_votes_up_percentage: "",
    public_interest_stats: "",
    description: "",
    links: "",
    platforms: "",
  });
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
      )
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const states = { data, loading };

  return { states };
};

export default useData;
