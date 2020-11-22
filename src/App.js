import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGreaterThan,
  faLessThan,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import bgImg from "./assets/background.cbd090c1.gif";

/* Containers */
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Comic from "./containers/Comic";
import Favourites from "./containers/Favourites";
import Character from "./containers/Character";

/* Components */
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";

/* Init Font */
library.add(faGreaterThan, faLessThan, faStar);

function App() {
  return (
    <div className="app" style={{ backgroundImage: `url(${bgImg})` }}>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/favourites">
              <Favourites />
            </Route>
            <Route path="/comic">
              <Comic />
            </Route>
            <Route path="/comics">
              <Comics />
            </Route>
            <Route path="/character">
              <Character />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
