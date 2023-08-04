const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// get all users
router.get('/',usersController.getUsers)
// post new user
router.post('/',usersController.createUser)
// get user by id
router.get('/:id',usersController.getUserById)
// update user by id
router.put('/:id',usersController.updateUserById)
// delete user by id 
router.delete('/:id',usersController.deleteUserById)
module.exports = router