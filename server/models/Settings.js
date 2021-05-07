import config from "./server/config/database";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.pass,
    database: config.database,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});