import React, { useEffect, useState } from "react";
import "../styles/Container.css";
import List from "./List";

import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Form from "./Form";
import { dragHappened, viewTrelloBoard } from "../redux/actions";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
let timeOut;

const Container = (props) => {
  const {
    dragHappened,
    isLoggedIn,
    trelloBoard,
    viewTrelloBoard,
    match: {
      params: { trelloBoardId }
    }
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    viewTrelloBoard({ trelloBoardId, setIsLoading });
  }, [trelloBoardId, viewTrelloBoard]);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (trelloBoard.length) {
        const updating = async () => {
          try {
            const { data } = await axios({
              url: `/update-trello-board/${trelloBoardId}`,
              method: "PATCH",
              data: { trellos: trelloBoard },
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("jwt")
              }
            });
            console.log("running");
            console.log(data);
          } catch (error) {
            console.log("error running");
            console.log(error);
            console.log(error.response);
          }
        };
        updating();
      }
    }, 5000);
  });

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    dragHappened({
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      draggableId,
      type
    });
  };

  return (
    <>
      {!isLoggedIn && <Redirect to="/" />}
      {isLoading && <Loading />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="all_lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="Container"
            >
              {trelloBoard.length !== 0 &&
                trelloBoard.map((list, index) => (
                  <List key={list.listId} list={list} index={index} />
                ))}
              {provided.placeholder}
              <Form isList={true} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const mapStateToProps = (state) => ({
  trelloBoard: [...state.trellos],
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps, { dragHappened, viewTrelloBoard })(
  Container
);
