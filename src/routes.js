const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController')

//List All Users
routes.get('/user', UserController.index)
//List A User
routes.get('/user/:id', UserController.listUser)
//Create a User
routes.post('/user', UserController.create)
//Update a User
routes.put('/user/:id', UserController.update)
//Get Friends of a User
routes.post('/user/friends', UserController.listFriends)
//SignIn
routes.post('/signin', UserController.signIn)
//Delete a user
routes.delete('/user/:id', UserController.delete)



module.exports = routes;
