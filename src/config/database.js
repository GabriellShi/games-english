require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "match_game_db",
  port: process.env.DB_PORT || "3306",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "mysql",
  define: {
    underscored: true
  }
};

module.exports = database;
// -------------- 
