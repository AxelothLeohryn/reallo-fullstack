const mongoose = require("../config/mongo_atlas");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  //Add more features to the Card...
});

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card };
