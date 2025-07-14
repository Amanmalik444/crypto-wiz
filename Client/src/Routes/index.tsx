import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CoinPage from "Routes/CoinPage";
import { Navbar } from "Components/Molecules";
import LandingPage from "Routes/LandingPage";
import Credentials from "Routes/Credentials";
import CoinMarket from "Routes/CoinMarket";
import StatusUpdates from "Routes/StatusUpdates";
import DashPreview from "Routes/Dashboard/Components/DashPreview/dashPreview";

import { Toast, Footer, ScrollerButton } from "Components/Atoms";

const Routes = () => {
  return (
    <Router>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={Navbar}
      />
      <Switch>
        <Route path="/credentials" exact component={Credentials} />
        <Route path="/market" exact component={CoinMarket} />
        <Route path="/dashboard" exact component={DashPreview} />
        <Route path="/statusUpdates" exact component={StatusUpdates} />
        <Route path="/coin/:coinId" exact component={CoinPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={Footer}
      />
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/statusUpdates"]}
        component={ScrollerButton}
      />
      <Toast />
    </Router>
  );
};

export default Routes;
