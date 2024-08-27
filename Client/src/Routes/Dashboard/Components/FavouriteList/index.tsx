import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { Loader, NoDataFetched } from "Components/Bricks";
import { CoinCard } from "Components/Mansions";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps & { data: []; loading: boolean };

const FavouriteList: React.FC<IProps> = ({
  currency = "inr",
  data,
  loading,
}) => {
  const history = useHistory();
  return (
    <div
      className="py-1 flex flex-wrap items-start justify-center w-5/6"
      id="favouriteList"
    >
      {loading ? (
        <Loader size="3" width="12" className="my-48" />
      ) : data.length > 0 ? (
        data.map(
          (fav: {
            cardData: {
              name: string | undefined;
              image: string | undefined;
              symbol: string | undefined;
              id: string | undefined;
            };
            createdAt: string | undefined;
          }) => (
            <>
              <CoinCard
                currency={currency}
                id={fav.cardData.id}
                name={fav.cardData.name}
                image={fav.cardData.image}
                symbol={fav.cardData.symbol}
                createdAt={fav.createdAt}
                favByDefault={true}
              />
            </>
          )
        )
      ) : (
        <NoDataFetched
          onClick={() => {
            history.push("/market");
            toast.success("Use Market to select Coins");
          }}
          errorMessage="No Coin saved"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { currency: state.currency.currency };
};

export default connect(mapStateToProps)(FavouriteList);
