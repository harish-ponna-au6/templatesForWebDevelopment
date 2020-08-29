import React from "react";
import "../styles/Container.css";
import List from "./List";

import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Form from "./Form";
import { dragHappened } from "../redux/actions";

const Container = (props) => {
  const { dragHappened } = props;
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
  const { lists } = props;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all_lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="Container"
          >
            {lists.map((list, index) => (
              <List key={list.listId} list={list} index={index} />
            ))}
            {provided.placeholder}
            <Form isList={true} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({ lists: [...state] });

export default connect(mapStateToProps, { dragHappened })(Container);
