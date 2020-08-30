import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import { Switch, Route, Redirect } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/trello-boards" component={Home} />
        <Route
          exact
          path="/trello-board/:trelloBoard/:trelloBoardId"
          component={Container}
        />
        <Route exact path="/" component={Account} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
