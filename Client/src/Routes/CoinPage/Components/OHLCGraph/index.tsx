import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";

import useData from "Routes/CoinPage/Components/OHLCGraph/data";
import { Loader } from "Components/Bricks";
import GraphOptions from "Routes/CoinPage/Components/OHLCGraph/GraphOptions";

type mapStateProps = ReturnType<typeof mapStateToProps>;

type IProps = mapStateProps & {
  coinId: string | undefined;
  name: string | undefined;
};

const OHLCGraph: React.FC<IProps> = ({
  coinId = "",
  currency = "inr",
  name = "",
}) => {
  const { states, setDays, setType } = useData({ name, coinId, currency });

  const { loading, series, options, type } = states;

  return (
    <div
      className="flex flex-col items-center justify-center 
      w-full py-10 my-6"
    >
      <GraphOptions setDays={setDays} setType={setType} type={type} />
      {loading ? (
        <Loader
          size="3"
          width="12"
          className="w-full flex align-center justify-center my-48"
        />
      ) : (
        <ReactApexChart
          series={series}
          // @ts-ignore
          options={options}
          type={type}
          className="w-full sm:w-3/4 md:w-1/2 py-4 h-96"
          width={"100%"}
          height={"100%"}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { currency: state.currency.currency };
};

export default connect(mapStateToProps)(OHLCGraph);
