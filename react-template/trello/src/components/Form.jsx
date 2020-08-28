import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Textarea from "react-textarea-autosize";
import "../styles/Form.css";
import { connect } from "react-redux";
import { addACard, addAList } from "../redux/actions";

const Form = (props) => {
  const { isCard, listId, addACard, addAList } = props;
  const [show, setShow] = useState(false);
  const [state, setState] = useState("");

  const handleOnMouseDown = () => {
    if (!state) return;
    if (isCard) addACard({ listId, text: state });
    else addAList(state);
    setState("");
  };

  const placeholder = isCard
    ? "Enter text for the card"
    : "Enter name of the list";
  const buttonText = isCard ? "Add a Card" : "Add a List";
  const submitText = isCard ? "Add Card" : "Add List";
  const color = isCard ? "var(--dark-light)" : "white";
  const className = isCard ? "cardForm" : "listForm";

  return (
    <div className="Form">
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
          className="addACardOrList"
          style={{ color }}
        >
          <i className="fas fa-plus"></i> {buttonText}
        </div>
      )}
    </div>
  );
};

export default connect(null, { addACard, addAList })(Form);
