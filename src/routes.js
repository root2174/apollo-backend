const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController')

//List All Users
routes.get('/user', UserController.index)
//List A User
//Create a User
routes.post('/user', UserController.create)
//Update a User
routes.put('/user/:id', UserController.update)
//Get Friends of a User
routes.post('/user/:id/friends', UserController.listFriends)



module.exports = routes;
