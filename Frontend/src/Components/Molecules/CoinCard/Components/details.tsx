import { useHistory } from "react-router-dom";
import moment from "moment";

interface IProps {
  name: string | undefined;
  symbol: string | undefined;
  id: string | undefined;
  currency?: string | undefined;
  current_price?: string | undefined;
  createdAt?: string | undefined;
}

const Details = ({
  name,
  symbol,
  current_price,
  currency,
  id,
  createdAt = "",
}: IProps) => {
  const history = useHistory();

  return (
    <div
      className="flex flex-col items-center justify-center
        backdrop-filter backdrop-blur-sm text-black
        bg-white hover:bg-gray-800 hover:text-white bg-opacity-50
        py-3 w-52 rounded-md cursor-pointer"
      onClick={() => {
        history.push(`/coin/${id}`);
      }}
    >
      <div className="flex flex-row flex-wrap">
        <p className="text-xl font-medium">{name}</p>
        <p className="text-xs font-small">{symbol}</p>
      </div>
      {currency && current_price && (
        <div>
          <p className="text-sm font-small">
            Current Price : {current_price} {currency}
          </p>
        </div>
      )}
      {!current_price && (
        <div>
          <p className="text-sm font-small">
            Added {moment(createdAt).fromNow()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Details;
