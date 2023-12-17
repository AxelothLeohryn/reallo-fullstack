const model = require("./Board");

async function getBoardsByUserId(id) {
  const boards = await model.Board.find({
    user_id: id,
  }).exec();
  // console.log(boards);
  return boards;
}

async function getBoardById(id) {
  try {
    const board = await model.Board.findById(id).exec();
    return board; // This will be null if no board is found
  } catch (error) {
    // Handle any errors that occur during the query
    throw error;
  }
}


async function createBoard(boardData) {
  const { name, description, user_id } = boardData;
  // console.log(boardData);
  const board = new model.Board({
    name,
    description,
    user_id,
  });
  const result = await board.save();
  console.log({
    message: "Board created!",
    result,
  });
}

async function updateBoard(id, boardData) {
  const updatedBoard = await model.Board.findByIdAndUpdate(id, boardData, {
    new: true,
  });

  return updatedBoard;
}

async function deleteBoard(id) {
  await model.Board.findByIdAndDelete(id);
}

module.exports = {
  getBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
