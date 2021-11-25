import * as React from "react";
import { Redirect } from "react-router-dom";

import { logo } from "../../utils";

const LandingPage = () => {
  const [timedOut, setTimedOut] = React.useState<boolean>(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (!timedOut) {
    return (
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <img
          className="object-contain h-50 w-auto pb-16"
          src={logo}
          alt="Crypto Wiz"
        />
      </div>
    );
  } else if (!localStorage.getItem("jwt")) {
    return <Redirect to="/credentials" />;
  } else {
    return <Redirect to="/dashboard" />;
  }
};

export default LandingPage;
