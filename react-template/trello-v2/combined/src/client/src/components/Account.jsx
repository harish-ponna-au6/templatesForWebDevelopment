import React from "react";
import UserForm from "./UserForm";
import "../styles/Account.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Account = (props) => {
  const { isLoggedIn } = props;
  return (
    <>
      {isLoggedIn && <Redirect to="/trello-boards" />}
      <div className="Account">
        <UserForm heading="Login" type="login" />
        <UserForm heading="Register" type="register" />
      </div>
    </>
  );
};

export default connect((state) => ({ isLoggedIn: state.user.isLoggedIn }))(
  Account
);
