const express = require("express");
const router = express.Router();

//Controllers...
const usersController = require("../controllers/users.controller");
const boardsController = require("../controllers/boards.controller");
const listsController = require("../controllers/lists.controller");
const cardsController = require("../controllers/cards.controller");

//Middlewares...

//Routes
// //---Users
router.get("/users/:id", usersController.getUserById);  //Obtain user data (for login)
router.post("/users", usersController.createUser);   //Create user (for register)

//---Boards
router.get("/users/:id/boards", boardsController.getBoardsByUserId);   //Obtain boards of user
// router.get("/boards/:id", boardsController.getBoard); // Get a board by id
router.post("/boards", boardsController.createBoard);   //Create board
router.put("/boards/:id", boardsController.updateBoard);  //Update board
router.delete("/boards/:id", boardsController.deleteBoard);  //Delete board


// //---Lists
router.get("/boards/:id/lists", listsController.getListsByBoardId); //Obtain lists of board
// router.get("/lists/:id", listsController.getList);
router.post("/lists", listsController.createList); //Create list
router.put("/lists/:id", listsController.updateList);  //Update list
router.delete("/lists/:id", listsController.deleteList);  //Delete list


// //---Cards
router.get("lists/:id/cards", cardsController.getCardsByListId);
// router.get("/cards/:id", cardsController.getCard);
router.post("/cards", cardsController.createCard);
router.put("/cards/:id", cardsController.updateCard);
router.delete("/cards/:id", cardsController.deleteCard);

module.exports = router;
