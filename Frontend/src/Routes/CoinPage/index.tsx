import { useParams } from "react-router-dom";

import { Loader } from "Components/Bricks";
import DetailCard from "Routes/CoinPage/Components/DetailCard";
import Stats from "Routes/CoinPage/Components/Stats";
import Description from "Routes/CoinPage/Components/Description";
import OHLCGraph from "Routes/CoinPage/Components/OHLCGraph";
import useData from "Routes/CoinPage/data";

const CoinPage = () => {
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
        <Loader size="5" width="20" className="my-80" />
      ) : (
        <div className="w-full flex flex-col flex-wrap items-center justify-center">
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
          <Description
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

export default CoinPage;
