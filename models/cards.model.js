const model = require("./Card");

async function getCardsByListId(id) {
  const cards = await model.Card.find({
    list_id: id,
  }).exec();
  return cards;
}

async function getCardById(id) {
  try {
    const card = await model.Card.findById(id).exec();
    return card; // This will be null if no card is found
  } catch (error) {
    // Handle any errors that occur during the query
    throw error;
  }
}


async function createCard(cardData) {
  const { name, description, list_id } = cardData; //Add more features to the card...
  const card = new model.Card({
    name,
    description,
    list_id,
  });
  const result = await card.save();
  console.log({
    message: "Card created!",
    result,
  });
}

async function updateCard(id, cardData) {
  const updatedCard = await model.Card.findByIdAndUpdate(id, cardData, {
    new: true,
  });

  return updatedCard;
}

async function deleteCard(id) {
  await model.Card.findByIdAndDelete(id);
}

module.exports = {
  getCardsByListId,
  getCardById,
  createCard,
  updateCard,
  deleteCard
};
