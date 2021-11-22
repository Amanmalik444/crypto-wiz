import { connect } from "react-redux";
import toast from "react-hot-toast";

import { Spinner, NoDataFetched } from "../../Components/Bricks";
import { CoinCard } from "../../Components/Mansions";
import Filters from "./Components/filters";
import PageButton from "./Components/pageButton";
import useData from "./data";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps;

const CoinMarket: React.FC<IProps> = ({ currency = "inr" }) => {
  const { states, setOrder, setPage, setCategory, increaseFavFlagNumber } =
    useData(currency);

  const { data, loading, page, favData } = states;

  return (
    <div className="pt-20 bg-gray-200 flex flex-col flex-wrap items-center justify-center">
      <Filters setOrder={setOrder} setCategory={setCategory} />
      {loading ? (
        <Spinner height="4xl" className="my-60" />
      ) : data && data!.length > 0 ? (
        <div className="flex flex flex-wrap items-center justify-center">
          {data?.map(
            (cardData: {
              name: string | undefined;
              image: string | undefined;
              symbol: string | undefined;
              id: string | undefined;
              current_price: string | undefined;
            }) => (
              <CoinCard
                currency={currency}
                id={cardData.id}
                name={cardData.name}
                image={cardData.image}
                symbol={cardData.symbol}
                current_price={cardData.current_price}
                favData={favData}
                toggleRefetch={increaseFavFlagNumber}
              />
            )
          )}
        </div>
      ) : (
        <NoDataFetched
          errorMessage="No data fetched"
          className="py-48"
          onClickNoData={() => {
            window.location.reload();
            toast.success("Refreshing Page");
          }}
        />
      )}
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black mt-2" />
      <PageButton
        setPage={setPage}
        page={page}
        className="mt-5 bg-opacity-20"
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { currency: state.currency.currency };
};

export default connect(mapStateToProps)(CoinMarket);
