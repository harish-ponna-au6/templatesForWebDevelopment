import React from "react";
import UserForm from "./UserForm";
import "../styles/Account.css";

const Account = () => {
  return (
    <div className="Account">
      <UserForm heading="Login" />
      <UserForm heading="Register" />
    </div>
  );
};

export default Account;
