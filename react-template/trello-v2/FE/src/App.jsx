import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import { Switch, Route } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        {/* <Route to="/" component={Account} /> */}
        <Route to="/trello-boards" component={Home} />
        {/* <Route to="/" component={Container} /> */}
      </Switch>
    </div>
  );
}
