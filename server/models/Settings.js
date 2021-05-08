var database = require("../config/database");
var mysql = require("mysql2/promise");

/**
 * Creates the connection with the database.
 */
const pool = mysql.createPool({
    host: database.host,
    user: database.user,
    password: database.pass,
    database: database.database,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Gets all the settings from the database.
 * 
 * @returns {Object} An object with all settings.
 */
async function getAllSettings() {
    const result = await pool.query(
      "SELECT * FROM settings"
    );
    return result[0].length < 1 ? {} : result[0];
}

/**
 * Gets the setting from the database based on the given key.
 * 
 * @param   {String}    key     The key for which to find the value. 
 * @returns {Object}    An object with the setting asked for.
 */
async function getSettingByKey(key) {
  console.log(key);
  const result = await pool.query(
      "SELECT value FROM settings WHERE `key` = ?", [key]
  );
  console.log(result);
  return result[0].length < 1 ? {} : result[0];
}

async function createSetting(key, value) {
  const result = await pool.query(
    "INSERT INTO settings SET `key` = ?, `value` = ?",
    [key, value]
  );
  if (result[0].length < 1) {
    throw new Error(
      `Failed to create a new setting ${key}, ${value}`
    );
  }
  return getSettingByKey(key);
}

async function updateSetting(key, value) {
  const result = await pool.query(
    "UPDATE settings SET value = ? WHERE `key` = ?",
    [value, key]
  );
  if (result[0].affectedRows < 1) {
    throw new Error(`User with id ${key} does not exist`);
  }
  return getSettingByKey(key);
}

module.exports = {
  getAllSettings,
  getSettingByKey,
  createSetting,
  updateSetting
};

