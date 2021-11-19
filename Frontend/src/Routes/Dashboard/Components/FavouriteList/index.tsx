import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import { Spinner, NoDataFetched } from "../../../../Components/Atoms";
import { CoinCard } from "../../../../Components/Molecules";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps & { data: []; loading: boolean };

const Favourites: React.FC<IProps> = ({ currency = "inr", data, loading }) => {
  const history = useHistory();
  return (
    <div
      className="py-1 flex flex-wrap items-start justify-center mx-10"
      id="favouriteList"
    >
      {loading ? (
        <Spinner height="4xl" className="my-28" />
      ) : data.length > 0 ? (
        data.map(
          (fav: {
            cardData: {
              name: string | undefined;
              image: string | undefined;
              symbol: string | undefined;
              id: string | undefined;
              current_price: string | undefined;
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
                current_price={fav.cardData.current_price}
                createdAt={fav.createdAt}
              />
            </>
          )
        )
      ) : (
        <NoDataFetched
          onClickNoData={() => {
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

export default connect(mapStateToProps)(Favourites);
