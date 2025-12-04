const db = require('./mysql.js');

// POST register a user for an event
exports.registerUser = async (req, res) => {
    const { user_id, event_id } = req.body;

    try {
        await db.execute(
            `INSERT INTO Registrations (user_id, event_id)
             VALUES (?, ?)`,
            [user_id, event_id]
        );

        res.redirect(`/events/${event_id}`);
    } catch (err) {
        console.error(err);

        // Duplicate registration check
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).send("User already registered for this event.");
        }

        res.status(500).send("Error registering user.");
    }
};

// POST cancel registration
exports.cancelRegistration = async (req, res) => {
    const { user_id, event_id } = req.body;

    try {
        await db.execute(
            `DELETE FROM Registrations
             WHERE user_id = ? AND event_id = ?`,
            [user_id, event_id]
        );

        res.redirect(`/events/${event_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error canceling registration.");
    }
};

// GET registrations for a user
exports.getRegistrationsForUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const [registrations] = await db.execute(
            `SELECT Events.*
             FROM Registrations
             JOIN Events ON Registrations.event_id = Events.event_id
             WHERE Registrations.user_id = ?`,
            [user_id]
        );

        res.render("userRegistrations", { registrations });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading user registrations.");
    }
};

// GET registrations for an event
exports.getRegistrationsForEvent = async (req, res) => {
    const { event_id } = req.params;

    try {
        const [users] = await db.execute(
            `SELECT Users.*
             FROM Registrations
             JOIN Users ON Registrations.user_id = Users.user_id
             WHERE Registrations.event_id = ?`,
            [event_id]
        );

        res.render("eventRegistrations", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading event registrations.");
    }
};