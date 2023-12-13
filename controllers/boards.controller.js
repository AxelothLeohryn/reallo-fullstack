const { model } = require("mongoose");
const models = require("../models/boards.model");

const getBoardsByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const boards = await models.getBoardsByUserId(id);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createBoard = async (req, res) => {
  // console.log(req.params);
  let boardData = req.body;
  try {
    await models.createBoard(boardData);
    res.status(201).json({
      message: "Board Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateBoard = async (req, res) => {
  let id = req.params.id;
  let boardData = req.body;
  try {
    const updatedBoard = await models.updateBoard(id, boardData);
    res.status(200).json({
      message: "Board updated: " + req.body.name,
      board: req.body,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteBoard = async (req, res) => {
  const id = req.params.id;
  try {
    await models.deleteBoard(id);
    res.status(200).json({
      message: "Board deleted: " + id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getBoardsByUserId,
  createBoard,
  updateBoard,
  deleteBoard,
};
