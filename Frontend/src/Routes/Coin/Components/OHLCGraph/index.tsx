import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";

import useData from "./data";
import { Spinner } from "../../../../Components/Atoms";
import GraphOptions from "./GraphOptions";

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
    h-full w-full py-10 z-10"
    >
      <GraphOptions setDays={setDays} setType={setType} />
      {loading ? (
        <div className="h-72 sm:h-96 flex align-center justify-center">
          <Spinner color="gray-900" height="4xl" />
        </div>
      ) : (
        <ReactApexChart
          series={series}
          // @ts-ignore
          options={options}
          type={type}
          className="w-full sm:w-3/4 md:w-1/2 h-72 sm:h-96 py-4"
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
