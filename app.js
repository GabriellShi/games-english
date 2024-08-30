const express = require('express');
const session = require('express-session'); // Adicione isso para importar o módulo de sessões
const path = require('path');
require('dotenv').config();

const app = express();

// Configuração da sessão
app.use(session({
    secret: 'seuSegredoAqui', // Substitua por uma string secreta forte
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Se estiver usando HTTPS, mude para true
}));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração para o parser do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar rotas
const gameRoutes = require('./src/routes/gameRoutes');
const spellingRoutes = require('./src/routes/spellingRoutes');
const indexRoutes = require('./src/routes/indexRoutes'); // Certifique-se que existe
const spellingAudioRoutes = require('./src/routes/spellingAudioRoutes');
const calendarRoutes = require('./src/routes/calendarRoutes');

app.use('/', gameRoutes);
app.use('/', spellingRoutes);
app.use('/', indexRoutes); // Certifique-se que existe
app.use('/', calendarRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
