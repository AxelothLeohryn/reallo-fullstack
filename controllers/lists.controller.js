const { model } = require("mongoose");
const models = require("../models/lists.model");

const getListsByBoardId = async (req, res) => {
  const id = req.params.id;
  try {
    const lists = await models.getListsByBoardId(id);
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createList = async (req, res) => {
  let listData = req.body;
  try {
    await models.createList(listData);
    res.status(201).json({
      message: "List Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateList = async (req, res) => {
  let id = req.params.id;
  let listData = req.body;
  try {
    const updatedList = await models.updateList(id, listData);
    res.status(200).json({
      message: "List updated: " + req.body.name,
      list: req.body,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteList = async (req, res) => {
  const id = req.params.id;
  try {
    await models.deleteList(id);
    res.status(200).json({
      message: "List deleted: " + id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getListsByBoardId,
  createList,
  updateList,
  deleteList,
};
