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

            // Verifica se há cartas suficientes
            if (cards.length < 4) {
                return res.status(500).send('Erro: Não há cartas suficientes no banco de dados.');
            }

            // Embaralha as cartas para evitar que as mesmas cartas apareçam sempre na mesma ordem
            const gameCards = cards.flatMap(card => ([
                { ...card.dataValues, isImage: true },  // Carta de imagem
                { ...card.dataValues, isImage: false }  // Carta de palavra
            ])).sort(() => 0.5 - Math.random());

            res.render('game', {
                title: 'Match Game',
                cards: gameCards,
            });
        } catch (error) {
            console.error('Erro ao carregar as cartas:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    pageSucesso: (req, res) => {
        res.render('pageSucesso', {
            title: 'Success',
        });
    },
};

module.exports = gameController;
