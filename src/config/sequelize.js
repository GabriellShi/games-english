require("dotenv").config();

const database = {
  dialect: 'sqlite',
  storage: './database.sqlite', // Especifica o caminho onde o arquivo do banco de dados será salvo
  define: {
    underscored: true
  }
};

module.exports = database;
