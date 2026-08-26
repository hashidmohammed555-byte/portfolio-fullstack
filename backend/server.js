const express = require("express");
const cors = require("cors");

const db = require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend is Running 🚀"
    });
});


// TEST
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API is Working 🔥"
    });
});


// SAVE CONTACT MESSAGE
app.post("/api/messages", (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email and message are required."
        });
    }

    try {

        const query = db.prepare(`
            INSERT INTO messages
            (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        `);

        const result = query.run(
            name,
            email,
            subject || "",
            message
        );

        res.status(201).json({
            success: true,
            message: "Message saved successfully! ✅",
            messageId: result.lastInsertRowid
        });

    } catch (error) {

        console.error("Database Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save message."
        });
    }
});


// GET ALL MESSAGES
app.get("/api/messages", (req, res) => {

    try {

        const messages = db.prepare(`
            SELECT *
            FROM messages
            ORDER BY created_at DESC
        `).all();

        res.json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {

        console.error("Database Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get messages."
        });
    }
});


const PORT = 5000;

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("🚀 PORTFOLIO BACKEND STARTED");
    console.log("================================");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("================================");

});