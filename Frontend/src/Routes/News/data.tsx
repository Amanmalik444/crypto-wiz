import * as React from "react";
import axios from "axios";

// interface IParams {
//   history: { push: (url: string) => void };
// }

const useData = () => {
  const [data, setData] = React.useState<[]>();
  React.useEffect(() => {
    axios
      .get(
        "https://www.coingecko.com/en/news"
      )
      .then((res: any) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const states = { data };

  return { states };
};

export default useData;
