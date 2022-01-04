import { connect } from "react-redux";
import toast from "react-hot-toast";

import { Loader, NoDataFetched } from "Components/Bricks";
import { CoinCard, Filters, Pagination } from "Components/Mansions";
import useData from "Routes/CoinMarket/data";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps;

const CoinMarket: React.FC<IProps> = ({ currency = "inr" }) => {
  const { states, setOrder, setPage, setCategory, increaseFavFlagNumber } =
    useData(currency);

  const {
    data,
    loading,
    page,
    favData,
    orderOptionsCoinMarket,
    categoriesCoinMarket,
  } = states;

  return (
    <div className="pt-20 bg-gray-200 flex flex-col flex-wrap items-center justify-center">
      <Filters
        selectArray={[
          { setHook: setOrder, options: orderOptionsCoinMarket },
          { setHook: setCategory, options: categoriesCoinMarket },
        ]}
      />
      {loading ? (
        <Loader size="3" width="12" className="my-64" />
      ) : data && data!.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center">
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
          onClick={() => {
            window.location.reload();
            toast.success("Refreshing Page");
          }}
        />
      )}
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black mt-2" />
      <Pagination
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
