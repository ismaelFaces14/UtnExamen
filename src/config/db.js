const mysql = require("mysql2/promise");
const { env } = require("./env");

const db = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.pass,
    database: env.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;