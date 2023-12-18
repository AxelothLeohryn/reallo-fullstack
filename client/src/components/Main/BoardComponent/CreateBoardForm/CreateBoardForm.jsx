import React, { useState } from "react";

const CreateBoardForm = ({ board, onCreate, onCancel }) => {
  const [name, setName] = useState(board ? board.name : '');
  const [description, setDescription] = useState(board ? board.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="create-board">
      <h2>Create a new Board</h2>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateBoardForm;
