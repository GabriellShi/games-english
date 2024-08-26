const Card = require('../models/Card');
const Sequelize = require('sequelize');

const gameController = {
    index: async (req, res) => {
        try {
            // Busca 4 cartas aleatórias do banco de dados
            const cards = await Card.findAll({
                order: Sequelize.literal('RAND()'),
                limit: 4
            });

            // Para cada carta, cria dois objetos: um para a imagem e outro para a palavra em inglês, garantindo que fiquem como pares inseparáveis
            const gameCards = cards.flatMap(card => ([
                { ...card.dataValues, isImage: true },  // Carta de imagem
                { ...card.dataValues, isImage: false }  // Carta de palavra
            ]));

            // Embaralha as cartas
            gameCards.sort(() => 0.5 - Math.random());

            res.render('game', {
                title: 'Jogo de Associação - Match Game',
                cards: gameCards,
            });
        } catch (error) {
            console.error('Erro ao carregar as cartas:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    pageSucesso: (req, res) => {
        res.render('pageSucesso', {
            title: 'Sucesso',
        });
    },
};

module.exports = gameController;
