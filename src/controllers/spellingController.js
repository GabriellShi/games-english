const Card = require('../models/Card');
const Sequelize = require('sequelize');

const spellingController = {
  index: async (req, res) => {
    try {
      if (!req.session.questions) {
        const cards = await Card.findAll({
          order: Sequelize.literal('RAND()'),
          limit: 10  // Seleciona até 10 itens aleatórios
        });

        if (cards.length < 10) {
          return res.status(500).send('Erro: Não há cartas suficientes no banco de dados.');
        }

        const questions = cards.sort(() => 0.5 - Math.random());

        req.session.questions = questions;
        req.session.currentQuestion = 0;
      }

      const currentCard = req.session.questions[req.session.currentQuestion];

      res.render('spelling', {
        title: 'Jogo de Ditado - Match Game',
        card: currentCard,
        questionNumber: req.session.currentQuestion + 1,
        totalQuestions: req.session.questions.length,
      });

      console.log("Current Card:", currentCard.word ? `Word: ${currentCard.word}, Translation: ${currentCard.translation}` : `Image: ${currentCard.imageUrl}`);

    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  check: (req, res) => {
    const { expectedWord, expectedTranslation, userAnswer } = req.body;

    console.log("Dados recebidos pelo controlador:");
    console.log("expectedWord:", expectedWord);
    console.log("expectedTranslation:", expectedTranslation);
    console.log("userAnswer:", userAnswer);

    if ((expectedWord || expectedTranslation) && userAnswer) {
      let correct = false;

      const currentCard = req.session.questions[req.session.currentQuestion];
      console.log("Verificando o card:", currentCard.word ? `Word: ${currentCard.word}` : `Image: ${currentCard.imageUrl}`);

      if (expectedWord) {
        correct = expectedWord.trim().toLowerCase() === userAnswer.trim().toLowerCase();
      } else if (expectedTranslation) {
        correct = expectedTranslation.trim().toLowerCase() === userAnswer.trim().toLowerCase();
      }

      console.log("Resposta correta?", correct);

      if (correct) {
        req.session.currentQuestion += 1;
        if (req.session.currentQuestion < req.session.questions.length) {
          return res.redirect('/spelling');
        } else {
          return res.redirect('/pageSucesso');
        }
      } else {
        return res.render('spelling', {
          title: 'Jogo de Ditado - Match Game',
          card: currentCard,
          questionNumber: req.session.currentQuestion + 1,
          totalQuestions: req.session.questions.length,
          feedback: "Errado, tente novamente."
        });
      }
    } else {
      res.status(400).send('Requisição inválida: palavra ou resposta não fornecida.');
    }
  },

  pageSucesso: (req, res) => {
    req.session.questions = null;
    req.session.currentQuestion = null;

    res.render('pageSucesso', {
      title: 'Sucesso',
    });
  },
};

module.exports = spellingController;
