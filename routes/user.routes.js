const routes = require('express').Router();
const usersController = require('../controllers/users.controller')

routes.post('/login', usersController.loginUser);
routes.post('/signup', usersController.signUpUser);
routes.get('/logout/:email', usersController.logout)
routes.get('/recoverpassword/:email', usersController.recoverPassword);
routes.put('/resetpassword/:recoverToken', usersController.resetPassword);

module.exports = routes;