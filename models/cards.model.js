const model = require("./Card");

async function getCardsByListId(id) {
  const cards = await model.Card.find({
    list_id: id,
  }).exec();
  return cards;
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
  createCard,
  updateCard,
  deleteCard
};
