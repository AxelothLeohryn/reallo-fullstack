import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import CreateCardForm from "./CreateCardForm";

import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ list, onUpdateList, onDeleteList }) => {
  const [refreshCards, setRefreshCards] = useState(false);
  const [cardsDataReady, setCardsDataReady] = useState(false);
  //List edition
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  //Card creation
  const [cards, setCards] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      if (list._id) {
        try {
          const response = await axios.get(`/api/lists/${list._id}/cards`);
          if (response.data.length > 0) {
            setCards(response.data);
            setRefreshCards(false);
            setCardsDataReady(true);
          }
        } catch (error) {
          console.error("Error fetching cards:", error);
          // Handle error
        }
      }
    };

    fetchCards();
  }, [refreshCards]); // Dependency on list._id to refetch if it changes

  //Edit List
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };
  const handleSave = () => {
    onUpdateList(list._id, { ...list, name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(list.name); // Revert to original name
    setIsEditing(false);
  };

  //Create card
  const handleCreateCard = async (listId, cardData) => {
    try {
      const fullCardData = { ...cardData, list_id: list._id };
      const response = await axios.post(`/api/cards`, fullCardData);
      setCardsDataReady(false);
      setCards([...cards, response.data]);
      setShowAddCardForm(false);
      setRefreshCards(true);
    } catch (error) {
      console.error("Error creating card:", error);
      // Optionally, handle the error in the UI
    }
  };
  const handleUpdateCard = async (cardId, updatedCardData) => {
    try {
      const response = await axios.put(`/api/cards/${cardId}`, updatedCardData);
      setCards(
        cards.map((card) => (card._id === cardId ? response.data : card))
      );
      setCardsDataReady(false);
      setRefreshCards(true);
    } catch (error) {
      console.error("Error updating card:", error);
      // Optionally, handle the error in the UI
    }
  };
  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`/api/cards/${cardId}`);
        setCards(cards.filter((card) => card._id !== cardId));
      } catch (error) {
        console.error("Error deleting card:", error);
        // Optionally, handle the error in the UI
      }
    }
  };

  return (
    <div className="list">
      <section className="list-title">
        {isEditing ? (
          <>
            <input type="text" value={editedName} onChange={handleNameChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{list.name}</h2>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteList(list._id)}>Delete List</button>
          </>
        )}
      </section>
      <section className="list-cards">
        <Droppable droppableId={list._id.toString()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cardsDataReady
                ? cards.map((card, index) => (
                    <Draggable
                      key={card._id}
                      draggableId={card._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            card={card}
                            onUpdateCard={handleUpdateCard}
                            onDeleteCard={handleDeleteCard}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {showAddCardForm ? (
          <CreateCardForm
            onCardCreate={handleCreateCard}
            onCancel={() => setShowAddCardForm(false)}
            listId={list._id}
          />
        ) : (
          <button onClick={() => setShowAddCardForm(true)}>Add Card</button>
        )}
      </section>
    </div>
  );
};

export default List;
