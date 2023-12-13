const mongoose = require("../config/mongo_atlas");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
//   boards: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Board",
//     },
//   ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
