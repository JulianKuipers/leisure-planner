require('dotenv').config();

var database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_NAME
}

module.exports = database;