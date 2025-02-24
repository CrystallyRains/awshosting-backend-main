const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables

// Create a connection asynchronously
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306,
        });

        console.log("✅ Connected to MySQL Database");
        return connection; // Return the database connection
    } catch (err) {
        console.error("❌ Error connecting to MySQL:", err);
        process.exit(1);
    }
};

// Export a promise that resolves to a connected DB
const db = connectDB();

module.exports = db;
