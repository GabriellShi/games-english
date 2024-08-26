const express = require('express');
const router = express.Router();
const spellingAudioController = require('../controllers/spellingAudioController');
const indexController = require('../controllers/indexController'); // Certifique-se que está importado

// Rota para renderizar a página do jogo de ditado com áudio
router.get('/spellingAudio', spellingAudioController.index);

// Rota para verificar a resposta do jogo de ditado com áudio
router.post('/spellingAudio/check', spellingAudioController.check);

// Rota para a página de sucesso
router.get('/pageSucesso', indexController.pageSucesso);

module.exports = router;
