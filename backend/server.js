require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const volunteerRoutes = require("./routes/volunteerRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/chat", chatRoutes);

// Test Route
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database Connected Successfully 🚀",
            time: result.rows[0],
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Database Connection Failed",
        });

    }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
