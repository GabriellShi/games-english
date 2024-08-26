const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Card = db.define("Card", {
  word: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  translation: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.NOW,
  },
}, {
  tableName: "cards",
  timestamps: false,
});


module.exports = Card;
