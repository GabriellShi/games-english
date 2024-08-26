const express = require('express');
const router = express.Router();
const spellingController = require('../controllers/spellingController');
const indexController = require('../controllers/indexController'); // Certifique-se que está importado

// Rota para renderizar a página do jogo de ditado
router.get('/spelling', spellingController.index);

// Rota para verificar a resposta do jogo de ditado
router.post('/spelling/check', spellingController.check);

// Rota para a página de sucesso
router.get('/pageSucesso', spellingController.pageSucesso);

module.exports = router;
