const db = require('./mysql.js');

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute("SELECT * FROM Users ORDER BY last_name ASC");
        res.render("users", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading users");
    }
};

// GET form to create new user
exports.newUserForm = (req, res) => {
    res.render("newUser");
};

// POST create user
exports.createUser = async (req, res) => {
    const { first_name, last_name, email, password_hash, role } = req.body;

    try {
        await db.execute(
            `INSERT INTO Users (first_name, last_name, email, password_hash, role)
             VALUES (?, ?, ?, ?, ?)`,
            [first_name, last_name, email, password_hash, role]
        );
        res.redirect("/users");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
};

// GET user by ID
exports.getUserById = async (req, res) => {
    try {
        const [user] = await db.execute(
            "SELECT * FROM Users WHERE user_id = ?",
            [req.params.id]
        );

        if (user.length === 0) return res.status(404).send("User not found");

        res.render("userDetails", { user: user[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading user");
    }
};

// POST update user
exports.updateUser = async (req, res) => {
    const { first_name, last_name, email, role } = req.body;

    try {
        await db.execute(
            `UPDATE Users
             SET first_name = ?, last_name = ?, email = ?, role = ?
             WHERE user_id = ?`,
            [first_name, last_name, email, role, req.params.id]
        );
        res.redirect(`/users/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
};

// POST delete user
exports.deleteUser = async (req, res) => {
    try {
        await db.execute("DELETE FROM Users WHERE user_id = ?", [req.params.id]);
        res.redirect("/users");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
};