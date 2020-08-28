import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/List.css";
import Form from "./Form";
import EditForm from "./EditForm";
import Card from "./Card";
import { deleteAList } from "../redux/actions";
import { connect } from "react-redux";

const List = (props) => {
  const { list, index, deleteAList } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={String(list.listId)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(list.listId)}>
            {(provided) => (
              <div
                className="List"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {!isEditing ? (
                  <>
                    <div className="title">
                      <p onClick={() => setIsEditing(true)}>{list.title} </p>
                      <i
                        onClick={() => setShowOptions(!showOptions)}
                        className="fas fa-ellipsis-h"
                      ></i>
                      {showOptions && (
                        <div className="list_options">
                          <p
                            onClick={() => {
                              setIsEditing(true);
                              setShowOptions(false);
                            }}
                          >
                            Edit
                          </p>
                          <p onClick={() => deleteAList(list.listId)}>Delete</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <EditForm
                    title={list.title}
                    listId={list.listId}
                    setIsEditing={setIsEditing}
                  />
                )}
                <div className="cardsContainer">
                  {list.cards.map((card, index) => (
                    <Card
                      key={card.cardId}
                      card={card}
                      index={index}
                      listId={list.listId}
                    />
                  ))}
                </div>
                {provided.placeholder}
                <Form listId={list.listId} isCard={true} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default connect(null, { deleteAList })(List);
