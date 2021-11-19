import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IParams {
  history: { push: (url: string) => void };
}

const useData = (history: IParams["history"]) => {
  const [status, setStatus] = React.useState<string>("Offline");
  React.useEffect(() => {
    toast.loading(`Connecting`, { id: "status" });
    setStatus("Connecting!");
    axios
      .get("https://api.coingecko.com/api/v3/ping")
      .then((res: any) => {
        if (res.data.gecko_says === "(V3) To the Moon!") {
          setStatus("Online");
          toast.success(`Servers are online`);
          toast.dismiss("status");
        } else {
          setStatus("Offline");
          toast.error(`Servers Offline`);
          toast.dismiss("status");
        }
      })
      .catch((err) => {
        setStatus("Offline");
        toast.error(`Servers Offline`);
        toast.dismiss("status");
      });
  }, []);

  const Logout = () => {
    toast.success(
      `${
        localStorage.getItem("jwt") ? "Logged Out" : "Please login to continue"
      }`,
      { duration: 4000 }
    );
    history.push(`/`);
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  const states = { status };

  return { Logout, states };
};

export default useData;
