import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Toast, Footer, ScrollButton } from "../Components/Bricks";
import LandingPage from "./LandingPage";
import Credentials from "./Credentials";
import { Navbar } from "../Components/Mansions";
import CoinMarket from "./CoinMarket";
import DashPreview from "./Dashboard/dashPreview";
import StatusUpdates from "./StatusUpdates";
import CoinPage from "./CoinPage";

const Routes = () => {
  return (
    <Router>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={Navbar}
      />
      <Switch>
        <Route path="/dashboard" exact component={DashPreview} />
        <Route path="/market" exact component={CoinMarket} />
        <Route path="/statusUpdates" exact component={StatusUpdates} />
        <Route path="/coin/:coinId" exact component={CoinPage} />
        <Route path="/credentials" exact component={Credentials} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={Footer}
      />
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={ScrollButton}
      />
      <Toast />
    </Router>
  );
};

export default Routes;
