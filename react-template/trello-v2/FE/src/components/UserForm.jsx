import React, { useState } from "react";
import "../styles/UserForm.css";
import Input from "./Input";
import { loginOrRegister } from "../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";

const UserForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    loginOrRegister,
    heading,
    type,
    history: { push }
  } = props;
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleOnChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    loginOrRegister({
      type,
      user: state,
      push,
      setIsLoading
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="UserForm">
        <form onSubmit={handleOnSubmit}>
          <h2 className="heading">{heading} Form</h2>
          {type === "register" && (
            <Input
              label="Name"
              type="text"
              handleOnChange={handleOnChange}
              name="name"
              placeholder="Enter your name"
            />
          )}
          <Input
            label="Email"
            type="email"
            handleOnChange={handleOnChange}
            name="email"
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            handleOnChange={handleOnChange}
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">{heading}</button>
        </form>
      </div>
    </>
  );
};

export default connect(null, { loginOrRegister })(withRouter(UserForm));
