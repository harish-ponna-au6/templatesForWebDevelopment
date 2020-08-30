import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import "../styles/EditForm.css";
import { connect } from "react-redux";
import { editACard, editAList, editABoardName } from "../redux/actions";

const EditForm = (props) => {
  const {
    isEditCard,
    isEditList,
    isEditBoard,
    board,
    boardId,
    listId,
    cardId,
    title,
    text,
    setIsEditing,
    editAList,
    editACard,
    editABoardName
  } = props;
  let titleOrTextOrBoard;
  if (isEditBoard) titleOrTextOrBoard = board;
  if (isEditList) titleOrTextOrBoard = title;
  if (isEditCard) titleOrTextOrBoard = text;
  const [state, setState] = useState(titleOrTextOrBoard);

  let placeholder;
  let submitText;
  let className;

  if (isEditCard) {
    placeholder = "Enter text for the card";
    submitText = "Save";
    className = "editCard";
  }
  if (isEditList) {
    placeholder = "Enter title of the list";
    submitText = "Save";
    className = "editList";
  }
  if (isEditBoard) {
    placeholder = "Enter name of the board";
    submitText = "Save";
    className = "editList";
  }

  const handleOnMouseDown = () => {
    if (!state) return;
    if (isEditCard) editACard({ listId, cardId, text: state });
    if (isEditList) editAList({ listId, title: state });
    if (isEditBoard) editABoardName({ boardId, name: state });
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

export default connect(null, { editACard, editAList, editABoardName })(
  EditForm
);
