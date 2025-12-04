const db = require('./mysql.js');

// GET all events
exports.getAllEvents = async (req, res) => {
    try {
        const [events] = await db.execute(
            `SELECT Events.*, CONCAT(Users.first_name, ' ', Users.last_name) AS host
             FROM Events
             JOIN Users ON Events.posted_by = Users.user_id
             ORDER BY event_date ASC`
        );
        res.render("events", { events });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading events");
    }
};

// GET form to create event
exports.newEventForm = (req, res) => {
    res.render("newEvent");
};

// POST create event
exports.createEvent = async (req, res) => {
    const { title, description, location, event_date, posted_by } = req.body;

    try {
        await db.execute(
            `INSERT INTO Events (title, description, location, event_date, posted_by)
             VALUES (?, ?, ?, ?, ?)`,
            [title, description, location, event_date, posted_by]
        );
        res.redirect("/events");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating event");
    }
};

// GET event by ID
exports.getEventById = async (req, res) => {
    try {
        const [event] = await db.execute(
            `SELECT Events.*, CONCAT(Users.first_name, ' ', Users.last_name) AS host
             FROM Events
             JOIN Users ON Events.posted_by = Users.user_id
             WHERE event_id = ?`,
            [req.params.id]
        );

        if (event.length === 0) return res.status(404).send("Event not found");

        res.render("eventDetails", { event: event[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading event");
    }
};

// POST update event
exports.updateEvent = async (req, res) => {
    const { title, description, location, event_date } = req.body;

    try {
        await db.execute(
            `UPDATE Events
             SET title = ?, description = ?, location = ?, event_date = ?
             WHERE event_id = ?`,
            [title, description, location, event_date, req.params.id]
        );

        res.redirect(`/events/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating event");
    }
};

// POST delete event
exports.deleteEvent = async (req, res) => {
    try {
        await db.execute("DELETE FROM Events WHERE event_id = ?", [req.params.id]);
        res.redirect("/events");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting event");
    }
};