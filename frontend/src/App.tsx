import React from "react";
import "./App.css";
import { Home } from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PartyRoom } from "./Components/PartyRoom";
import { TopNav } from "./Components/TopNav";



export const App = () => {
  const code = new URLSearchParams(window.location.search).get("code")
  console.log(code);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/party">
            <TopNav />
            <PartyRoom code={code}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
