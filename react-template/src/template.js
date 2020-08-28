import React from "react";
import "./styles/App.css";
import { connect } from "react-redux";
import { userState } from "./redux/mapStateToProps";
import { SET_USER } from "./redux/actionCreators/userActionCreators";

function App(props) {
  const {} = props;
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default connect(
  userState,
  { SET_USER }
)(App);
