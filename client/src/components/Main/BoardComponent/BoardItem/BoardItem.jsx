import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BoardItem = ({ board, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${board._id}`); // Navigate to /boards/:id
  };

  const handleEdit = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    onEdit(board);
  };

  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    onDelete(board._id);
  };

  useEffect(() => {
    console.log(board.name);
  }, []);

  return (
    <>
      <article className="board-item" onClick={handleClick}>
        <h2>{board.name}</h2>
        <h3>{board.description}</h3>
        <button className="board-item-edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="board-item-delete" onClick={handleDelete}>
          Delete
        </button>
      </article>
    </>
  );
};

export default BoardItem;
