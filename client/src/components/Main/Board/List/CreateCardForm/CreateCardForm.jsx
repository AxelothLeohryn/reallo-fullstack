import React, { useState } from "react";

const CreateCardForm = ({ onCardCreate, onCancel, listId }) => {
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardCreate(listId, { name: cardName, description: cardDescription });
    setCardName("");
    setCardDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Card Name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={cardDescription}
        onChange={(e) => setCardDescription(e.target.value)}
      />
      <div className="create-card-buttons">
        <button type="submit">Create</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCardForm;
