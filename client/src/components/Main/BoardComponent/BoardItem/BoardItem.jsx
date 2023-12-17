import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <EditIcon className="board-item-edit" onClick={handleEdit} />
        <DeleteIcon className="board-item-delete" onClick={handleDelete} />
      </article>
    </>
  );
};

export default BoardItem;
