const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');


// Rota para processar o formulário de criação de palavra
router.get('/calendar', calendarController.calendar);



module.exports = router;
