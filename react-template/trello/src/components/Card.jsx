import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/Card.css";
import { deleteACard } from "../redux/actions";
import { connect } from "react-redux";
import EditForm from "./EditForm";

const Card = (props) => {
  const { card, index, deleteACard, listId } = props;
  const [isEditing, setIsEditing] = useState(false);
  return !isEditing ? (
    <Draggable draggableId={String(card.cardId)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="Card"
        >
          <p onClick={() => setIsEditing(true)}>{card.text}</p>
          <div className="card_options">
            <i
              onClick={() => {
                setIsEditing(true);
              }}
              className="fas fa-pencil-alt"
            ></i>
            <i
              onClick={() => deleteACard({ listId, cardId: card.cardId })}
              className="fas fa-trash-alt"
            ></i>
          </div>
        </div>
      )}
    </Draggable>
  ) : (
    <EditForm
      isEditCard={true}
      text={card.text}
      listId={listId}
      cardId={card.cardId}
      setIsEditing={setIsEditing}
    />
  );
};

export default connect(null, { deleteACard })(Card);
