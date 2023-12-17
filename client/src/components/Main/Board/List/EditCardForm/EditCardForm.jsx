import React, { useState } from "react";

const EditCardForm = ({ card, onCardUpdate, onCancel }) => {
  const [editedName, setEditedName] = useState(card.name);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardUpdate(card._id, { name: editedName, description: editedDescription });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        placeholder="Card Name"
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Update Card</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCardForm;
