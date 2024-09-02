const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const indexController = require('../controllers/indexController');

// Configuração de upload de arquivos com multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/')); // Certifique-se que a pasta "uploads" existe
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Gera um nome de arquivo único
    }
});

const upload = multer({ storage: storage });

router.get('/', indexController.index);
router.get('/createWord', indexController.createWordForm);
router.post('/createWord', upload.array('imageFile[]', 10), indexController.createWord); // Corrige o campo para "imageFile[]"
router.get('/successWord', indexController.successWord);
router.get('/wordList', indexController.wordList);
router.post('/deleteWord/:id', indexController.deleteWord);

module.exports = router;
