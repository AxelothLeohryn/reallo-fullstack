import React, { useState } from "react";

const CreateListForm = ({ onListCreate, onCancel }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onListCreate({ name: listName });
    setListName("");
  };

  return (
    <form className="create-list" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className="create-list-buttons">
        <button type="submit">Create List</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateListForm;
