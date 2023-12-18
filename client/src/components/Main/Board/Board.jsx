import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";

import List from "./List";
import CreateListForm from "./CreateListForm";

const Board = () => {
  const { id } = useParams(); // Get the board ID from the URL
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [refreshLists, setRefreshLists] = useState(false);
  const [listsDataReady, setListsDataReady] = useState(false);
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
        setListsDataReady(true);
        setRefreshLists(false);
      } catch (error) {
        console.error("Error fetching lists:", error);
        // Handle error
      }
    };

    fetchLists();
  }, [refreshLists]);

  const handleCreateList = async (listData) => {
    try {
      // Include board_id in the data sent to the server
      const fullListData = { ...listData, board_id: board._id };

      const response = await axios.post(`/api/lists`, fullListData);
      setListsDataReady(false);
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
      setListsDataReady(false);
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

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // Do nothing if the card is dropped outside a droppable area or dropped in the same place
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Prepare the data for the API call
    const newCardData = {
      newListId: destination.droppableId,
      newOrder: destination.index,
    };

    // API call to update the backend
    try {
      await axios.put(`/api/cards/${result.draggableId}/move`, newCardData);
      // Update the local state to reflect the changes
      // This may involve fetching the updated lists and cards again from the backend
      // or manipulating the local state to reflect the new order
      setListsDataReady(false);
      setRefreshLists(true);
    } catch (error) {
      console.error("Error moving card:", error.message);
      // Optionally, handle the error in the UI
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
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="board-lists">
          {listsDataReady
            ? lists.map((list) => (
                <List
                  key={list._id}
                  list={list}
                  onUpdateList={handleUpdateList}
                  onDeleteList={handleDeleteList}
                />
              ))
            : null}
          {showCreateListForm ? (
            <CreateListForm
              onListCreate={handleCreateList}
              onCancel={() => setShowCreateListForm(false)}
            />
          ) : (
            <section className="create-list-button" onClick={() => setShowCreateListForm(true)}>
              <AddIcon  />
              <h2>Create New List</h2>
            </section>
          )}
        </section>
      </DragDropContext>
    </>
  );
};

export default Board;
