const axios = require('axios');
const Card = require('../models/Card');

const calendarController = {
    calendar: async (req, res) => {
        res.render('calendar', {
            title: 'Jogo - Início',
        });
    },


  };
  
  

module.exports = calendarController;
