import React, { useState } from "react";
import EditCardForm from "../EditCardForm";

const Card = ({ card, onUpdateCard, onDeleteCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleUpdate = (cardId, updatedCardData) => {
    onUpdateCard(cardId, updatedCardData);
    setIsEditing(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="card">
      <div className="card-header" onClick={toggleCollapse}>
        <h3>{card.name}</h3>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDeleteCard(card._id)}>Delete</button>
      </div>
      {isEditing ? (
        <EditCardForm
          card={card}
          onCardUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <p className={`card-content ${isCollapsed ? "hidden" : "visible"}`}>
          {card.description}
        </p>
      )}
    </div>
  );
};

export default Card;
