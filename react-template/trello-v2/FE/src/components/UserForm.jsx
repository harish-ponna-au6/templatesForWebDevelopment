import React, { useState } from "react";
import "../styles/UserForm.css";

const UserForm = (props) => {
  const { heading } = props;
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleOnChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="UserForm">
      <form onSubmit={handleOnSubmit}>
        <h2 className="heading">{heading} Form</h2>
        {heading === "Register" && (
          <>
            <label htmlFor="name">Name</label>
            <br />
            <input
              required
              id="name"
              name="name"
              onChange={handleOnChange}
              type="text"
              placeholder="Enter your name"
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <br />
        <input
          required
          id="email"
          name="email"
          onChange={handleOnChange}
          type="text"
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <br />
        <input
          required
          id="password"
          name="password"
          onChange={handleOnChange}
          type="text"
          placeholder="Enter your password"
        />
        <button type="submit">{heading}</button>
      </form>
    </div>
  );
};

export default UserForm;
