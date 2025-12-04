const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Show all users
router.get("/", usersController.getAllUsers);

// Show form to create user
router.get("/new", usersController.newUserForm);

// Create user
router.post("/create", usersController.createUser);

// View specific user
router.get("/:id", usersController.getUserById);

// Update user
router.post("/:id/update", usersController.updateUser);

// Delete user
router.post("/:id/delete", usersController.deleteUser);

module.exports = router;