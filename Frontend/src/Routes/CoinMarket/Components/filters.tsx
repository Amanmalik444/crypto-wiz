import * as React from "react";
import Select from "react-select";

interface IProps {
  setOrder: any;
  setCategory: any;
}

const Filters: React.FC<IProps> = ({ setOrder, setCategory }) => {
  const orderOptions = [
    {
      label: (
        <p>
          <i className="bx bx-down-arrow-alt" /> Volume
        </p>
      ),
      value: "volume_desc",
    },
    {
      label: (
        <p>
          <i className="bx bx-up-arrow-alt" /> Volume
        </p>
      ),
      value: "volume_asc",
    },
    {
      label: (
        <p>
          <i className="bx bx-down-arrow-alt" /> Market cap
        </p>
      ),
      value: "market_cap_desc",
    },
    {
      label: (
        <p>
          <i className="bx bx-up-arrow-alt" /> Market cap
        </p>
      ),
      value: "market_cap_asc",
    },
    {
      label: (
        <p>
          <i className="bx bx-down-arrow-alt" /> Id
        </p>
      ),
      value: "id_desc",
    },
    {
      label: (
        <p>
          <i className="bx bx-up-arrow-alt" /> Id
        </p>
      ),
      value: "id_asc",
    },
    {
      label: (
        <p>
          <i className="bx bx-down-arrow-alt" /> Gecko
        </p>
      ),
      value: "gecko_desc",
    },
    {
      label: (
        <p>
          <i className="bx bx-up-arrow-alt" /> Gecko
        </p>
      ),
      value: "gecko_asc",
    },
  ];

  const categories = [
    {
      label: "All categories",
      value: "all_cat",
    },
    {
      value: "aave-tokens",
      label: "Aave Tokens",
    },
    {
      value: "analytics",
      label: "Analytics",
    },
    {
      value: "arbitrum-ecosystem",
      label: "Arbitrum Ecosystem",
    },
    {
      value: "artificial-intelligence",
      label: "Artificial Intelligence",
    },
    {
      value: "asset-backed-tokens",
      label: "Asset-backed Tokens",
    },
    {
      value: "asset-manager",
      label: "Asset Manager",
    },
    {
      value: "augmented-reality",
      label: "Augmented Reality",
    },
    {
      value: "automated-market-maker-amm",
      label: "Automated Market Maker (AMM)",
    },
    {
      value: "avalanche-ecosystem",
      label: "Avalanche Ecosystem",
    },
    {
      value: "axie-infinity",
      label: "Axie Infinity",
    },
    {
      value: "big-data",
      label: "Big Data",
    },
    {
      value: "binance-launchpool",
      label: "Binance Launchpool",
    },
    {
      value: "binance-smart-chain",
      label: "Binance Smart Chain Ecosystem",
    },
    {
      value: "business-platform",
      label: "Business Platform",
    },
    {
      value: "business-services",
      label: "Business Services",
    },
    {
      value: "celo-ecosystem",
      label: "Celo Ecosystem",
    },
    {
      value: "centralized-exchange-token-cex",
      label: "Centralized Exchange Token (CEX)",
    },
    {
      value: "charity",
      label: "Charity",
    },
    {
      value: "cny-stablecoin",
      label: "CNY Stablecoin",
    },
    {
      value: "collectibles",
      label: "Collectibles",
    },
    {
      value: "communication",
      label: "Communication",
    },
    {
      value: "compound-tokens",
      label: "Compound Tokens",
    },
    {
      value: "cosmos-ecosystem",
      label: "Cosmos Ecosystem",
    },
    {
      value: "cryptocurrency",
      label: "Crypto currency",
    },
    {
      value: "daomaker-ecosystem",
      label: "DaoMaker Ecosystem",
    },
    {
      value: "decentralized-exchange",
      label: "Decentralized Exchange Token (DEX)",
    },
    {
      value: "decentralized-finance-defi",
      label: "Decentralized Finance (DeFi)",
    },
    {
      value: "defi-index",
      label: "DeFi Index",
    },
    {
      value: "decentralized-derivatives",
      label: "Derivatives",
    },
    {
      value: "education",
      label: "Education",
    },
    {
      value: "energy",
      label: "Energy",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "etf",
      label: "ETF",
    },
    {
      value: "eth-2-0-staking",
      label: "Eth 2.0 Staking",
    },
    {
      value: "eur-stablecoin",
      label: "EUR Stablecoin",
    },
    {
      value: "exchange-based-tokens",
      label: "Exchange-based Tokens",
    },
    {
      value: "fan-token",
      label: "Fan Token",
    },
    {
      value: "fantom-ecosystem",
      label: "Fantom Ecosystem",
    },
    {
      value: "finance-banking",
      label: "Finance / Banking",
    },
    {
      value: "fractionalized-nft",
      label: "Fractionalized NFT",
    },
    {
      value: "gambling",
      label: "Gambling",
    },
    {
      value: "gaming",
      label: "Gaming",
    },
    {
      value: "gbp-stablecoin",
      label: "GBP Stablecoin",
    },
    {
      value: "gig-economy",
      label: "Gig Economy",
    },
    {
      value: "governance",
      label: "Governance",
    },
    {
      value: "harmony-ecosystem",
      label: "Harmony Ecosystem",
    },
    {
      value: "healthcare",
      label: "Healthcare",
    },
    {
      value: "heco-chain-ecosystem",
      label: "HECO Chain Ecosystem",
    },
    {
      value: "impossible-launchpad",
      label: "Impossible Launchpad",
    },
    {
      value: "index-coin",
      label: "Index",
    },
    {
      value: "infrastructure",
      label: "Infrastructure",
    },
    {
      value: "insurance",
      label: "Insurance",
    },
    {
      value: "internet-of-things-iot",
      label: "Internet of Things (IOT)",
    },
    {
      value: "investment",
      label: "Investment",
    },
    {
      value: "iotex-ecosystem",
      label: "IoTeX Ecosystem",
    },
    {
      value: "kardiachain-ecosystem",
      label: "KardiaChain Ecosystem",
    },
    {
      value: "krw-stablecoin",
      label: "KRW Stablecoin",
    },
    {
      value: "launchpad",
      label: "Launchpad",
    },
    {
      value: "layer-1",
      label: "Layer 1",
    },
    {
      value: "legal",
      label: "Legal",
    },
    {
      value: "lending-borrowing",
      label: "Lending / Borrowing",
    },
    {
      value: "leveraged-token",
      label: "Leveraged Token",
    },
    {
      value: "lp-tokens",
      label: "LP Tokens",
    },
    {
      value: "manufacturing",
      label: "Manufacturing",
    },
    {
      value: "marketing",
      label: "Marketing",
    },
    {
      value: "masternodes",
      label: "Masternodes",
    },
    {
      value: "media",
      label: "Media",
    },
    {
      value: "meme-token",
      label: "Meme Tokens",
    },
    {
      value: "metaverse",
      label: "Metaverse",
    },
    {
      value: "mev-protection",
      label: "MEV Protection",
    },
    {
      value: "mirrored-assets",
      label: "Mirrored Assets",
    },
    {
      value: "music",
      label: "Music",
    },
    {
      value: "near-protocol-ecosystem",
      label: "Near Protocol Ecosystem",
    },
    {
      value: "nft-index",
      label: "NFT Index",
    },
    {
      value: "niftex-shards",
      label: "Niftex Shards",
    },
    {
      value: "non-fungible-tokens-nft",
      label: "Non-Fungible Tokens (NFT)",
    },
    {
      value: "number",
      label: "Number",
    },
    {
      value: "olympus-pro",
      label: "Olympus Pro",
    },
    {
      value: "decentralized-options",
      label: "Options",
    },
    {
      value: "oracle",
      label: "Oracle",
    },
    {
      value: "other",
      label: "Other",
    },
    {
      value: "decentralized-perpetuals",
      label: "Perpetuals",
    },
    {
      value: "play-to-earn",
      label: "Play To Earn",
    },
    {
      value: "dot-ecosystem",
      label: "Polkadot Ecosystem",
    },
    {
      value: "polygon-ecosystem",
      label: "Polygon Ecosystem",
    },
    {
      value: "prediction-markets",
      label: "Prediction Markets",
    },
    {
      value: "privacy-coins",
      label: "Privacy Coins",
    },
    {
      value: "protocol",
      label: "Protocol",
    },
    {
      value: "real-estate",
      label: "Real Estate",
    },
    {
      value: "realt-tokens",
      label: "RealT Tokens",
    },
    {
      value: "rebase-tokens",
      label: "Rebase Tokens",
    },
    {
      value: "reddit-points",
      label: "Reddit Points",
    },
    {
      value: "remittance",
      label: "Remittance",
    },
    {
      value: "retail",
      label: "Retail",
    },
    {
      value: "seigniorage",
      label: "Seigniorage",
    },
    {
      value: "smart-contract-platform",
      label: "Smart Contract Platform",
    },
    {
      value: "social-money",
      label: "Social Money",
    },
    {
      value: "software",
      label: "Software",
    },
    {
      value: "solana-ecosystem",
      label: "Solana Ecosystem",
    },
    {
      value: "sports",
      label: "Sports",
    },
    {
      value: "stablecoins",
      label: "Stablecoins",
    },
    {
      value: "storage",
      label: "Storage",
    },
    {
      value: "structured-products",
      label: "Structured Products",
    },
    {
      value: "synthetic-assets",
      label: "Synthetic Issuer",
    },
    {
      value: "synths",
      label: "Synths",
    },
    {
      value: "technology-science",
      label: "Technology & Science",
    },
    {
      value: "terra-ecosystem",
      label: "Terra Ecosystem",
    },
    {
      value: "tokenized-btc",
      label: "Tokenized BTC",
    },
    {
      value: "tokenized-gold",
      label: "Tokenized Gold",
    },
    {
      value: "tokenized-products",
      label: "Tokenized Products",
    },
    {
      value: "tokenized-stock",
      label: "Tokenized Stock",
    },
    {
      value: "tokensets",
      label: "TokenSets",
    },
    {
      value: "tourism",
      label: "Tourism",
    },
    {
      value: "usd-stablecoin",
      label: "USD Stablecoin",
    },
    {
      value: "us-election-2020",
      label: "US Election 2020",
    },
    {
      value: "utokens",
      label: "uTokens",
    },
    {
      value: "virtual-reality",
      label: "Virtual Reality",
    },
    {
      value: "wallets",
      label: "Wallets",
    },
    {
      value: "wrapped-tokens",
      label: "Wrapped-Tokens",
    },
    {
      value: "xdai-ecosystem",
      label: "xDAI Ecosystem",
    },
    {
      value: "yearn-yfi-partnerships-mergers",
      label: "Yearn Ecosystem",
    },
    {
      value: "yield-aggregator",
      label: "Yield Aggregator",
    },
    {
      value: "yield-farming",
      label: "Yield Farming",
    },
    {
      value: "zilliqa-ecosystem",
      label: "Zilliqa Ecosystem",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-wrap flex-row items-center justify-center">
        <Select
          onChange={(e) => {
            setOrder(e?.value);
          }}
          options={orderOptions}
          defaultValue={{
            label: (
              <p>
                <i className="bx bx-down-arrow-alt" /> Market cap
              </p>
            ),
            value: "market_cap_desc",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
          })}
          className="mx-3 my-2"
        />
        <Select
          onChange={(e) => {
            setCategory(e?.value);
          }}
          options={categories}
          defaultValue={{
            label: "All categories",
            value: "all_cat",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
          })}
          className="mx-3 my-2"
        />
      </div>
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black my-2" />
    </div>
  );
};

export default Filters;
