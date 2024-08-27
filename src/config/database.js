// require("dotenv").config();
// const database = {
//   username: process.env.DB_USERNAME || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_DATABASE || "match_game_db",
//   port: process.env.DB_PORT || "3306",
//   host: process.env.DB_HOST || "127.0.0.1",
//   dialect: process.env.DB_DIALECT || "mysql",
//   define: {
//     underscored: true
//   }
// };

// module.exports = database;


require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "fE26H3He41bBFf6BcHEC1dD6AGE4f1Fd",
  database: process.env.DB_DATABASE || "match_game_db",
  port: process.env.DB_PORT || "17568",
  host: process.env.DB_HOST || "roundhouse.proxy.rlwy.net",
  dialect: process.env.DB_DIALECT || "mysql",
  define: {
    underscored: true
  }
};

module.exports = database;