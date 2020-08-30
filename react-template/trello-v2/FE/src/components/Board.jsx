import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import { connect } from "react-redux";
import { deleteABoard } from "../redux/actions";

const Board = (props) => {
  const { board, deleteABoard } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const boardNameOptionsRef = useRef();
  useEffect(() => {
    const handleClickListener = document.addEventListener("mousedown", (e) => {
      if (
        boardNameOptionsRef.current &&
        !boardNameOptionsRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    });
    return document.removeEventListener("mousedown", handleClickListener);
  }, [boardNameOptionsRef]);
  return (
    <div className="board">
      {!isEditing ? (
        <>
          <Link to={`/trello-board/${board.name}/${board._id}`}>
            {board.name}
          </Link>
          <i
            onClick={() => setShowOptions(!showOptions)}
            className="fas fa-ellipsis-h"
          ></i>
          {showOptions && (
            <div ref={boardNameOptionsRef} className="list_options">
              <p
                onClick={() => {
                  setIsEditing(true);
                  setShowOptions(false);
                }}
              >
                Edit
              </p>
              <p onClick={() => deleteABoard(board._id)}>Delete</p>
            </div>
          )}
        </>
      ) : (
        <EditForm
          isEditBoard={true}
          setIsEditing={setIsEditing}
          board={board.name}
          boardId={board._id}
        />
      )}
    </div>
  );
};

export default connect(null, { deleteABoard })(Board);
