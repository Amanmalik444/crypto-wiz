import { connect } from "react-redux";
import toast from "react-hot-toast";

import { Spinner, NoDataFetched } from "../../Components/Atoms";
import { CoinCard } from "../../Components/Molecules";
import Filters from "./Components/filters";
import PageButton from "./Components/pageButton";
import useData from "./data";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps;

const CoinMarket: React.FC<IProps> = ({ currency = "inr" }) => {
  const { states, setOrder, setPage, setCategory } = useData(currency);

  const { data, loading, page } = states;

  return (
    <div className="pt-20 bg-gray-200 flex flex-wrap items-start justify-center">
      <Filters setOrder={setOrder} setCategory={setCategory} />
      {loading ? (
        <Spinner height="4xl" className="my-64" />
      ) : data && data!.length > 0 ? (
        data?.map(
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
            />
          )
        )
      ) : (
        <NoDataFetched
          errorMessage="No data fetched"
          className="py-52"
          onClickNoData={() => {
            window.location.reload();
            toast.success("Refreshing Page");
          }}
        />
      )}
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
