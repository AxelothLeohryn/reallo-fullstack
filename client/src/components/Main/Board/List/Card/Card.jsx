import React, { useState } from "react";
import EditCardForm from "../EditCardForm";

const Card = ({ card, onUpdateCard, onDeleteCard }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (cardId, updatedCardData) => {
    onUpdateCard(cardId, updatedCardData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <EditCardForm
          card={card}
          onCardUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h3>{card.name}</h3>
          <p>{card.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteCard(card._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Card;
