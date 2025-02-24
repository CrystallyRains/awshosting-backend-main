require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Use promise-based MySQL

const app = express();
const PORT = process.env.PORT || 5000;
const API_VERSION = process.env.API_V1 || "v1";

// ROUTE IMPORTS
const todoRoutes = require("./routes/todo/index.js");

// APP SETTINGS
app.use(express.json());
app.use(cors());

// Async Database Connection
const connectDB = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
        });

        console.log("✅ Connected to MySQL Database");
        return db;
    } catch (err) {
        console.error("❌ Error connecting to MySQL:", err);
        process.exit(1);
    }
};

let db;
connectDB().then((connection) => {
    db = connection;
});

// Health Check Route
app.get("/healthcheck", (req, res) => {
    res.status(200).send("ok");
});

// Todo Routes
app.use(`/api/${API_VERSION}/todo`, todoRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
