const express = require("express");
const router = express.Router();
const registrationsController = require("../controllers/registrationsController");

// Register a user for an event
router.post("/register", registrationsController.registerUser);

// Cancel a registration
router.post("/cancel", registrationsController.cancelRegistration);

// View all registrations for a user
router.get("/user/:user_id", registrationsController.getRegistrationsForUser);

// View all people registered for a specific event
router.get("/event/:event_id", registrationsController.getRegistrationsForEvent);

module.exports = router;