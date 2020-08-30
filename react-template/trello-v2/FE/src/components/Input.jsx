import React from "react";

const Input = (props) => {
  const { type, name, label, placeholder, handleOnChange } = props;
  return (
    <>
      <label>{label}</label>
      <br />
      <input
        required
        name={name}
        onChange={handleOnChange}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
