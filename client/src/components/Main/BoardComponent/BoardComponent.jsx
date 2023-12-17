import axios from "axios";
import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import CreateBoardForm from "./CreateBoardForm";
import EditBoardForm from "./EditBoardForm";
import { v4 as uuidv4 } from "uuid";

const BoardComponent = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshBoards, setRefreshBoards] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const currentEmail = localStorage.getItem("email");
        setIsLoading(true); // Start loading
        const userResponse = await axios.get(`/api/users/${currentEmail}`);
        const userId = userResponse.data._id;
        const boardsResponse = await axios.get(`/api/users/${userId}/boards`);
        setBoards(boardsResponse.data);
        setIsLoading(false); // Stop loading after fetching
      } catch (error) {
        console.error(
          "Error fetching boards:",
          error.response ? error.response : error
        );
        setIsLoading(false); // Stop loading after fetching
      }
    };

    fetchBoards();
    setRefreshBoards(false);
  }, [refreshBoards]);

  const printBoardItems = () => {
    if (boards.length === 0) {
      return <div>No boards available. Create one!</div>;
    }
    return boards.map((board) => (
      <BoardItem
        key={board._id}
        board={board}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    )); // Using board._id as key
  };

  const handleCreate = async (boardData) => {
    if (!boardData.name || !boardData.description) {
      alert("Please fill in all fields");
      return;
    }
    const userEmail = localStorage.getItem("email");
    const userResponse = await axios.get(`/api/users/${userEmail}`);
    const userId = userResponse.data._id;
    const newBoardData = {
      ...boardData,
      user_id: userId,
    };
    try {
      const response = await axios.post("/api/boards", newBoardData);
      setBoards([...boards, response.data]); // Assuming response.data is the new board
      setShowCreateForm(false); // Hide the form
      setRefreshBoards(true);
      // Handle any additional UI updates or notifications
    } catch (error) {
      console.error("Error creating board:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleEdit = (board) => {
    setEditingBoard(board);
    setShowEditForm(true);
  };

  const handleUpdate = async (boardId, updatedBoardData) => {
    console.log("Updating board with ID:", boardId); // Log board ID
    console.log("Data:", updatedBoardData); // Log data being sent
    try {
      const response = await axios.put(
        `/api/boards/${editingBoard._id}`,
        updatedBoardData
      );
      setBoards(
        boards.map((board) =>
          board._id === editingBoard._id ? response.data : board
        )
      );
      setShowEditForm(false);
      setEditingBoard(null);
      setRefreshBoards(true); // You might want to re-fetch the boards
    } catch (error) {
      console.error("Error updating board:", error);
      setShowEditForm(false);
    }
  };

  const handleDelete = async (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        await axios.delete(`/api/boards/${boardId}`);
        setBoards(boards.filter((board) => board._id !== boardId));
        setRefreshBoards(true);
        // Show success message or handle UI changes
      } catch (error) {
        console.error("Error deleting board:", error);
        // Handle error (e.g., show error message)
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> //LOADING SPINNER...
      ) : (
        <section className="board-list">
          {boards.length > 0 ? printBoardItems() : null}
          <button onClick={() => setShowCreateForm(true)}>
            Create New Board
          </button>
          {showCreateForm && (
            <CreateBoardForm
              onCreate={editingBoard ? handleUpdate : handleCreate}
              onCancel={() => setShowCreateForm(false)}
            />
          )}
          {showEditForm && editingBoard && (
            <EditBoardForm
              board={editingBoard}
              onEdit={handleUpdate}
              onCancel={() => setShowEditForm(false)}
            />
          )}
        </section>
      )}
    </>
  );
};

export default BoardComponent;
