const models = require("../models/users.model");

const getUserById = async (req, res) => {
  const user = await models.getUserById(req.id);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  let userData = req.body;
  try {
    await models.createUser(userData);
    res.status(201).json({
      message: "User Created!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = {
    getUserById,
    createUser
}