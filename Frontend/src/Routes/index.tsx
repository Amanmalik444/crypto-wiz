import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Toast, Footer, ScrollButton } from "../Components/Bricks";
import LandingPage from "./LandingPage";
import Credentials from "./Credentials";
import { Navbar } from "../Components/Mansions";
import CoinMarket from "./CoinMarket";
import DashPreview from "./Dashboard/dashPreview";
import News from "./News";
import CoinPage from "./CoinPage";

const Routes = () => {
  return (
    <Router>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/news"]}
        component={Navbar}
      />
      <Switch>
        <Route path="/dashboard" exact component={DashPreview} />
        <Route path="/market" exact component={CoinMarket} />
        <Route path="/news" exact component={News} />
        <Route path="/coin/:coinId" exact component={CoinPage} />
        <Route path="/credentials" exact component={Credentials} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/news"]}
        component={Footer}
      />
      <Route
        path={["/dashboard", "/market", "/coin/:coinId", "/news"]}
        component={ScrollButton}
      />
      <Toast />
    </Router>
  );
};

export default Routes;
