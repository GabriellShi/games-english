const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rota para renderizar a página do jogo de associação
router.get('/game', gameController.index);

// Rota para a página de sucesso
router.get('/pageSucesso', gameController.pageSucesso);

module.exports = router;
