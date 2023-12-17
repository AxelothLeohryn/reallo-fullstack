import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import List from "./List";
import CreateListForm from "./CreateListForm";

const Board = () => {
  const { id } = useParams(); // Get the board ID from the URL
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [refreshLists, setRefreshLists] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}`);
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchBoardData();
  }, [id]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`/api/boards/${id}/lists`);
        setLists(response.data);
        setRefreshLists(false);
      } catch (error) {
        console.error("Error fetching lists:", error);
        // Handle error
      }
    };

    fetchLists();
  }, [refreshLists]); // Re-fetch lists if board ID changes

  const handleCreateList = async (listData) => {
    try {
      // Include board_id in the data sent to the server
      const fullListData = { ...listData, board_id: board._id };

      const response = await axios.post(`/api/lists`, fullListData);
      setLists([...lists, response.data]); // Add the new list to the existing lists
      setShowCreateListForm(false);
      setRefreshLists(true);
    } catch (error) {
      console.error("Error creating list:", error);
      // Optionally, handle the error in the UI
    }
  };

  const handleUpdateList = async (listId, updatedListData) => {
    try {
      const response = await axios.put(`/api/lists/${listId}`, updatedListData);
      // Update the state to reflect the edited list
      setLists(
        lists.map((list) => (list._id === listId ? response.data : list))
      );
      setRefreshLists(true);
      // You might want to add logic to close the editing mode
    } catch (error) {
      console.error("Error updating list:", error);
      // Optionally, handle the error in the UI
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        await axios.delete(`/api/lists/${listId}`);
        setLists(lists.filter((list) => list._id !== listId));
      } catch (error) {
        console.error("Error deleting list:", error);
        // Optionally, handle the error in the UI
      }
    }
  };

  if (!board) {
    return <div>Loading board...</div>; // Or any other loading state
  }

  return (
    <>
      <section className="board-header">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
      </section>
      <section className="board-lists">
        {lists.map((list) => (
          <List key={list._id} list={list} onUpdateList={handleUpdateList} onDeleteList={handleDeleteList} />
        ))}
        <button onClick={() => setShowCreateListForm(true)}>
          Create New List
        </button>
        {showCreateListForm && (
          <CreateListForm
            onListCreate={handleCreateList}
            onCancel={() => setShowCreateListForm(false)}
          />
        )}
      </section>
    </>
  );
};

export default Board;
