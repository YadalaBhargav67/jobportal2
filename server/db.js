const mysql = require("mysql2");

console.log("db.js loaded");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Laxmi@1233",
    database: "jobportal"
});

db.connect((err) => {
    if (err) {
        console.log("Connection Error:", err);
    } else {
        console.log("✅ MySQL Connected Successfully!");
    }
});

module.exports = db;