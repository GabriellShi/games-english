const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definindo um modelo exemplo para a tabela cards
const Card = sequelize.define('Card', {
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
  translation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});
