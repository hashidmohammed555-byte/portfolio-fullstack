const Database = require("better-sqlite3");

const db = new Database("./database/portfolio.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log("✅ SQLite Database Connected");
console.log("✅ Messages Table Ready");

module.exports = db;