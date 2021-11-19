import { useParams } from "react-router-dom";

import { Spinner } from "../../Components/Atoms";
import DetailCard from "./Components/DetailCard";
import Stats from "./Components/Stats";
import Desc from "./Components/Desc";
import OHLCGraph from "./Components/OHLCGraph";
import useData from "./data";

const Dashboard = () => {
  // const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { coinId } = useParams<{ coinId?: string | undefined }>();
  const { states } = useData(coinId);
  const { data, loading } = states;

  const {
    name,
    image,
    symbol,
    hashing_algorithm,
    block_time_in_minutes,
    last_updated,
    coingecko_rank,
    market_cap_rank,
    developer_score,
    liquidity_score,
    coingecko_score,
    public_interest_score,
    sentiment_votes_down_percentage,
    sentiment_votes_up_percentage,
    public_interest_stats,
    categories,
    description,
    links,
    platforms,
  } = data;

  return (
    <div className="flex items-start justify-center w-full pt-24">
      {loading ? (
        <Spinner height="4xl" className="mt-60 mb-44" />
      ) : (
        <div className="flex flex-col flex-wrap items-center justify-center">
          <DetailCard
            image={image}
            name={name}
            symbol={symbol}
            hashing_algorithm={hashing_algorithm}
            block_time_in_minutes={block_time_in_minutes}
            last_updated={last_updated}
          />
          <Stats
            coingecko_rank={coingecko_rank}
            market_cap_rank={market_cap_rank}
            developer_score={developer_score}
            liquidity_score={liquidity_score}
            coingecko_score={coingecko_score}
            public_interest_score={public_interest_score}
            sentiment_votes_down_percentage={sentiment_votes_down_percentage}
            sentiment_votes_up_percentage={sentiment_votes_up_percentage}
            public_interest_stats={public_interest_stats}
          />
          <OHLCGraph coinId={coinId} name={name} />
          <Desc
            categories={categories}
            description={description}
            links={links}
            platforms={platforms}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
