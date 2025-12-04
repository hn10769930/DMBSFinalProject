const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// GET all events
router.get("/", eventsController.getAllEvents);

// GET form to create event
router.get("/new", eventsController.newEventForm);

// POST create event
router.post("/create", eventsController.createEvent);

// GET one event
router.get("/:id", eventsController.getEventById);

// POST update event
router.post("/:id/update", eventsController.updateEvent);

// POST delete event
router.post("/:id/delete", eventsController.deleteEvent);

module.exports = router;