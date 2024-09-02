const express = require('express');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Configuração de upload de arquivos com multer
const upload = multer({ dest: 'uploads/' }); // Pasta temporária para armazenar os uploads

// Configuração da sessão
app.use(session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar rotas
const gameRoutes = require('./src/routes/gameRoutes');
const spellingRoutes = require('./src/routes/spellingRoutes');
const indexRoutes = require('./src/routes/indexRoutes');
const spellingAudioRoutes = require('./src/routes/spellingAudioRoutes');
const calendarRoutes = require('./src/routes/calendarRoutes');

app.use('/', gameRoutes);
app.use('/', spellingRoutes);
app.use('/', indexRoutes);
app.use('/', spellingAudioRoutes);
app.use('/', calendarRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
