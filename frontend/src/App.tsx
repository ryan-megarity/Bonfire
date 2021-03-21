import React, { useState } from "react";
import "./App.css";
import { Home } from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PartyRoom } from "./Components/PartyRoom";
import { TopNav } from "./Components/TopNav";

export const App = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const [isRoomOwner, setIsRoomOwner] = useState(!!localStorage.getItem('roomOwner') || false);
  const [roomCode, setRoomCode] = useState(localStorage.getItem('roomCode') || '');
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home isRoomOwner={isRoomOwner} setIsRoomOwner={setIsRoomOwner} roomCode={roomCode} setRoomCode={setRoomCode}/>
          </Route>
          <Route path="/party">
            <TopNav isRoomOwner={isRoomOwner} roomCode={roomCode}/>
            <PartyRoom code={code} isRoomOwner={isRoomOwner} setRoomOwner={setIsRoomOwner} roomCode={roomCode} setRoomCode={setRoomCode} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
