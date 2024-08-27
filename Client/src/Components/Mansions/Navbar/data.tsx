import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IParams {
  history: { push: (url: string) => void };
}

const useData = (history: IParams["history"]) => {
  const [status, setStatus] = React.useState<
    "Online" | "Offline" | "Connecting!"
  >("Offline");
  const [connectModalVisibile, setConnectModalVisibility] =
    React.useState<boolean>(false);
  const [messageModalVisibile, setMessageModalVisibility] =
    React.useState<boolean>(false);
  const [settingsModalVisibile, setSettingsModalVisibility] =
    React.useState<boolean>(false);

  const isLoggedIn = Boolean(localStorage.getItem("jwt"));

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
      .catch(() => {
        setStatus("Offline");
        toast.error(`Servers Offline`);
        toast.dismiss("status");
      });
  }, []);

  const Logout = () => {
    toast.success(`${isLoggedIn ? "Logged Out" : "Please login to continue"}`, {
      duration: 4000,
    });
    history.push(`/`);
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  const states = {
    status,
    messageModalVisibile,
    connectModalVisibile,
    settingsModalVisibile,
    isLoggedIn,
  };

  return {
    Logout,
    states,
    setMessageModalVisibility,
    setConnectModalVisibility,
    setSettingsModalVisibility,
  };
};

export default useData;
