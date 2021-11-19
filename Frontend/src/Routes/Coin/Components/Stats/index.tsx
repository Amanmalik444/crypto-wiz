import { TextData } from "../../../../Components/Atoms";

interface IProps {
  coingecko_rank: string;
  market_cap_rank: string;
  developer_score: string;
  liquidity_score: string;
  coingecko_score: string;
  public_interest_score: string;
  sentiment_votes_down_percentage: string;
  sentiment_votes_up_percentage: string;
  public_interest_stats: any;
}

const Stats = ({
  coingecko_rank,
  market_cap_rank,
  developer_score,
  liquidity_score,
  coingecko_score,
  public_interest_score,
  sentiment_votes_down_percentage,
  sentiment_votes_up_percentage,
  public_interest_stats,
}: IProps) => {
  return (
    <div
      className="flex flex-row flex-wrap items-center justify-center 
      w-full px-4"
    >
      <div className="flex flex-row flex-wrap items-start justify-center py-5">
        <TextData first="CoinGecko Rank" second={coingecko_rank || "N/A"} />
        <TextData first="Market Cap Rank" second={market_cap_rank || "N/A"} />
        <TextData
          first="Alexa Rank"
          second={public_interest_stats?.alexa_rank || "N/A"}
        />
        <TextData first="CoinGecko Score" second={coingecko_score || "N/A"} />
        <TextData first="Developer Score" second={developer_score || "N/A"} />
        <TextData first="Liquidity Score" second={liquidity_score || "N/A"} />
        <TextData
          first="Public Interest Score"
          second={public_interest_score || "N/A"}
        />
        <TextData
          first="Bing Matches"
          second={public_interest_stats?.bing_matches || "N/A"}
        />
        <TextData
          first="Sentiment votes down Percentage"
          second={sentiment_votes_down_percentage || "N/A"}
        />
        <TextData
          first="Sentiment votes up Percentage"
          second={sentiment_votes_up_percentage || "N/A"}
        />
      </div>
      <hr className="w-4/5" />
    </div>
  );
};

export default Stats;
