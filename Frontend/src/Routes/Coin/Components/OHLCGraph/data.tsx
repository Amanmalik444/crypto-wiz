import * as React from "react";
import axios from "axios";

interface IState {
  data: any;
  loading: boolean;
  days: number | undefined;
  type: "line" | "area" | "candlestick";
}

interface IProps {
  coinId: string | undefined;
  currency: string | undefined;
  name: string | undefined;
}

const useData = ({ coinId, currency, name }: IProps) => {
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [type, setType] = React.useState<IState["type"]>("candlestick");
  const [days, setDays] = React.useState<IState["days"]>(7);
  const [data, setData] = React.useState<IState["data"]>([
    {
      x: new Date(1538778600000),
      y: [0, 0, 0, 0, 0],
    },
  ]);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=${currency}&days=${days}`
      )
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currency, days, type]);

  const options = {
    title: {
      text: `${name} Chart`,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data,
    },
  ];

  const states = { loading, options, series, type };

  return { states, setDays, setType };
};

export default useData;
