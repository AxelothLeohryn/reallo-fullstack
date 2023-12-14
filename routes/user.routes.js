const routes = require('express').Router();
const usersController = require('../controllers/users.controller')
const protectedRoutes = require('../middlewares/verifiedToken')

// Public routes
routes.post('/login', usersController.loginUser);
routes.post('/signup', usersController.signUpUser);
routes.get('/recoverpassword/:email', usersController.recoverPassword);
routes.put('/resetpassword/:recoverToken', usersController.resetPassword);

// Protected routes
routes.post('/logout', protectedRoutes, usersController.logout);

module.exports = routes;