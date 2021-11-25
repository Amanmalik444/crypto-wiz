import { useHistory } from "react-router-dom";
import moment from "moment";

interface IProps {
  name: string | undefined;
  symbol: string | undefined;
  id: string | undefined;
  currency?: string | undefined;
  current_price?: string | undefined | number;
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
        p-3 w-52 rounded-md cursor-pointer transition duration-300 ease-out"
      onClick={() => {
        history.push(`/coin/${id}`);
      }}
    >
      <div className="flex flex-row">
        <p className="text-lg font-medium">{name}</p>
        <p className="text-xs font-small">{symbol}</p>
      </div>
      {currency && (current_price || current_price === 0) && (
        <div>
          <p className="text-sm font-small">
            Current Price : {current_price} {currency}
          </p>
        </div>
      )}
      {createdAt && (
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
