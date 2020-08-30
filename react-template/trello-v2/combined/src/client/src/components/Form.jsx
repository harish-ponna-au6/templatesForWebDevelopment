import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import "../styles/Form.css";
import { connect } from "react-redux";
import { addACard, addAList, addABoard } from "../redux/actions";

const Form = (props) => {
  const {
    isCard,
    isList,
    listId,
    addACard,
    addAList,
    isBoard,
    addABoard
  } = props;
  const [show, setShow] = useState(false);
  const [state, setState] = useState("");

  const handleOnMouseDown = () => {
    if (!state) return;
    if (isCard) addACard({ listId, text: state });
    if (isList) addAList(state);
    if (isBoard) addABoard(state);
    setState("");
  };

  let placeholder;
  let buttonText;
  let submitText;
  let color;
  let className;
  if (isCard) {
    placeholder = "Enter text for the card";
    buttonText = "Add a Card";
    submitText = "Add Card";
    color = "var(--dark-light)";
    className = "cardForm";
  }
  if (isList) {
    placeholder = "Enter name of the list";
    buttonText = "Add a List";
    submitText = "Add List";
    color = "white";
    className = "listForm";
  }
  if (isBoard) {
    placeholder = "Enter name of the Board";
    buttonText = "Add a Board";
    submitText = "Add Board";
    color = "white";
    className = "listForm";
  }

  return (
    <div className={`Form ${className}`}>
      {show ? (
        <form>
          <Textarea
            value={state}
            onChange={(e) => setState(e.target.value)}
            autoFocus
            onBlur={() => setShow(!show)}
            className={`textarea ${className}`}
            placeholder={placeholder}
          />
          <input
            onMouseDown={handleOnMouseDown}
            type="button"
            value={submitText}
          />
          <i className="fas fa-times" onClick={() => setShow(!show)}></i>
        </form>
      ) : (
        <div
          onClick={() => setShow(!show)}
          className={`addACardOrList`}
          style={{ color }}
        >
          <i className="fas fa-plus"></i> {buttonText}
        </div>
      )}
    </div>
  );
};

export default connect(null, { addACard, addAList, addABoard })(Form);
