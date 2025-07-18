import toast from "react-hot-toast";

import Details from "Components/Molecules/CoinCard/Components/details";
import FavouriteIcon from "Components/Molecules/CoinCard/Components/favouriteIcon";
import ShareIcon from "Components/Molecules/CoinCard/Components/shareIcon";

interface IProps {
  name: string | undefined;
  image: string | undefined;
  symbol: string | undefined;
  id: string | undefined;
  currency?: string | undefined;
  current_price?: string | undefined;
  createdAt?: string | undefined;
  favByDefault?: boolean;
  favData?: string[];
  toggleRefetch?: () => void;
}

const CoinCard = ({
  currency,
  name,
  current_price,
  image,
  symbol,
  id,
  createdAt = "",
  favByDefault = false,
  favData,
  toggleRefetch = () => {},
}: IProps) => {
  return (
    <div
      className="m-4 h-60 w-60
      container shadow-md hover:shadow-xl transition duration-300 ease-out
      bg-white bg-contain bg-no-repeat bg-center 
      rounded-xl"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className="absolute flex align-center justify-between 
      w-60 text-2xl p-2"
      >
        {localStorage.getItem("jwt") ? (
          <FavouriteIcon
            id={id}
            name={name}
            image={image}
            symbol={symbol}
            favByDefault={favByDefault}
            favData={favData}
            toggleRefetch={toggleRefetch}
          />
        ) : (
          <i
            className="bx bxs-heart cursor-pointer text-red-500 opacity-25"
            style={{
              textShadow:
                "0 0px 3px rgba(255,255,255,0.5), 0 0px 1px rgba(255,255,255,1)",
            }}
            onClick={() => {
              toast.error("Please Login to use this Feature");
            }}
          />
        )}
        <ShareIcon coinName={name} coinId={id} />
      </div>
      <div className="flex items-center justify-center h-60 w-60">
        <Details
          name={name}
          symbol={symbol}
          current_price={current_price}
          currency={currency}
          id={id}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default CoinCard;
