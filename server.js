//*************************************************************************
//*** Full Name: Christian Urquhart
//*** Course Title: Database Management Systems
//*** Submission Date: 4 December 2025
//*** Assignment: Final Project – Hawk Events Application
//*** File Name: server.js
//*** Purpose: This file implements the Node.js/Express backend server. 
//***          It handles all HTTP routing logic,
//***          connects front-end forms to the MySQL database, and processes
//***          requests for login, signup, event creation, and event search.
//*************************************************************************


const express = require('express');
const path = require('path');
const pool = require('./mysql.js'); // uses existing db pool
const app = express();
const fsp = require (fs').promises;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.get('/', function(req,res) {
    fsp.readFile("./public/main.html");

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Users WHERE email = ? AND password_hash = ?',
            [email, password]
        );

        if (rows.length === 0) {
            return res.send("Invalid email or password");
        }

        res.redirect('/main.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

// SIGNUP
app.post('/signup', async (req, res) => {
    const { fname, lname, email, password, copypassword, role } = req.body;

    // Backend validation
    if (!fname || !lname || !email || !password || !copypassword) {
        return res.status(400).send("All fields are required.");
    }

    if (password !== copypassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Make sure role matches ENUM
    let safeRole = (role || "student").toLowerCase();
    if (!["student", "host", "admin"].includes(safeRole)) {
        safeRole = "student";
    }

    try {
        await pool.execute(
            `INSERT INTO Users (first_name, last_name, email, password_hash, role)
             VALUES (?, ?, ?, ?, ?)`,
            [fname, lname, email, password, safeRole]
        );

        res.redirect("/login.html");

    } catch (err) {
        console.error("Signup error:", err);

        // duplicate email
        if (err.code === "ER_DUP_ENTRY") {
            return res
                .status(400)
                .send("That email is already registered. Please log in instead.");
        }

        return res.status(500).send("Signup failed: " + err.message);
    }
});

// ADD EVENT
app.post('/events/add', async (req, res) => {
    const { title, description, location, 'event-time': eventDate } = req.body;

    try {
        // TEMPORARY: assign host ID = 1 until login sessions
        const postedBy = 1;

        await pool.execute(
            `INSERT INTO Events (title, description, location, event_date, posted_by)
             VALUES (?, ?, ?, ?, ?)`,
            [title, description, location, eventDate, postedBy]
        );

        res.redirect('/main.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Could not add event");
    }
});

app.get('/', async (req,res) => {
    req.sendFile("./public/main.html")
})

// SEARCH EVENTS
app.get('/events/search', async (req, res) => {
    const { search } = req.query;

    try {
        const [rows] = await pool.execute(
            `SELECT * FROM Events
             WHERE title LIKE ? OR description LIKE ? OR location LIKE ?
             ORDER BY event_date ASC`,
            [`%${search}%`, `%${search}%`, `%${search}%`]
        );

        let html = `<h2>Search Results</h2>`;
        if (rows.length === 0) {
            html += "<p>No events found.</p>";
        } else {
            rows.forEach(ev => {
                html += `
                    <div style="padding:10px; margin:10px; background:white;">
                        <h3>${ev.title}</h3>
                        <p>${ev.description}</p>
                        <p><b>Location:</b> ${ev.location}</p>
                        <p><b>Date:</b> ${ev.event_date}</p>
                    </div>
                `;
            });
        }

        html += `<a href="/main.html">Return Home</a>`;
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send("Search failed");
    }
});


// ------------------- START SERVER -------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
