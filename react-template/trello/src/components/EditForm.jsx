import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import "../styles/EditForm.css";
import { connect } from "react-redux";
import { editACard, editAList } from "../redux/actions";

const EditForm = (props) => {
  const {
    isEditCard,
    listId,
    cardId,
    title,
    text,
    setIsEditing,
    editAList,
    editACard
  } = props;
  const titleOrText = isEditCard ? text : title;
  const [state, setState] = useState(titleOrText);

  let placeholder;
  let submitText;
  let className;

  if (isEditCard) {
    placeholder = "Enter text for the card";
    submitText = "Save";
    className = "editCard";
  } else {
    placeholder = "Enter title of the list";
    submitText = "Save";
    className = "editList";
  }

  const handleOnMouseDown = () => {
    if (!state) return;
    if (isEditCard) editACard({ listId, cardId, text: state });
    else editAList({ listId, title: state });
    setState("");
  };

  return (
    <div className="EditForm">
      <form>
        <Textarea
          value={state}
          onChange={(e) => setState(e.target.value)}
          autoFocus
          onBlur={() => setIsEditing(false)}
          className={`textarea ${className}`}
          placeholder={placeholder}
        />
        <input
          onMouseDown={handleOnMouseDown}
          type="button"
          value={submitText}
        />
        <i className="fas fa-times" onClick={() => setIsEditing(false)}></i>
      </form>
    </div>
  );
};

export default connect(null, { editACard, editAList })(EditForm);
