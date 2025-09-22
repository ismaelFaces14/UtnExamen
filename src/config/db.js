import mysql from 'mysql2/promise';
import { env } from './env.js';

const db = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.pass,
    database: env.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000
});

export default db;