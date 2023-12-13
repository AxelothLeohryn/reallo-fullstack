const mongoose = require("../config/mongo_atlas");

// const listSchema = new mongoose.Schema({
//   list_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "List",
//   },
// });
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // lists: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "List",
  //   },
  // ],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };
