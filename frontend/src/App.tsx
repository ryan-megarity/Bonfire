import React from "react";
import "./App.css";
import { Home } from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PartyRoom } from "./Components/PartyRoom";
import { TopNav } from "./Components/TopNav";

export const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/party">
            <TopNav />
            <PartyRoom />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
