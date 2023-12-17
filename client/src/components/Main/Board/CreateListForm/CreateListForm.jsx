import React, { useState } from "react";

const CreateListForm = ({ onListCreate, onCancel }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onListCreate({ name: listName });
    setListName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button type="submit">Create List</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateListForm;
