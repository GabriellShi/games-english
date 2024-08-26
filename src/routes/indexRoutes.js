const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Rota para a página inicial
router.get('/', indexController.index);

// Rota para o formulário de criação de palavra
router.get('/createWord', indexController.createWordForm);

// Rota para processar o formulário de criação de palavra
router.post('/createWord', indexController.createWord);

// Rota para a página de sucesso
router.get('/successWord', indexController.successWord);

module.exports = router;
