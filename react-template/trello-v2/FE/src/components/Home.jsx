import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
import "../styles/Home.css";
import EditForm from "./EditForm";

const Home = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="Home">
      <div className="addABoardContainer">
        <Form isBoard={true} />
      </div>
      <h2>All Boards</h2>
      <div className="allBoards">
        {!isEditing ? (
          <>
            <div className="board">
              <p>First Board</p>
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
                  {/* <p onClick={() => deleteAList(list.listId)}>Delete</p> */}
                  <p>Delete</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <EditForm
            isEditBoard={true}
            name={`name`}
            trelloBoardId={`34ghjg`}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
