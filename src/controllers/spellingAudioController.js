const Card = require('../models/Card');
const Sequelize = require('sequelize');

const spellingAudioController = {
  index: async (req, res) => {
    try {
      // Busca 15 palavras aleatórias do banco de dados
      let words = await Card.findAll({
        order: Sequelize.literal('RAND()'),
        limit: 15
      });

      // Verifica se há palavras suficientes
      if (words.length < 15) {
        return res.status(500).send('Erro: Não há palavras suficientes no banco de dados.');
      }

      req.session.words = words;

      res.render('spellingAudio', {
        title: 'Spelling with Sound',
        words,
        currentWordIndex: 0,
        correctAnswers: 0,
        showWriteInput: true,
        showSpeakBtn: true,
        showSpeakAnswerBtn: false
      });
    } catch (error) {
      console.error('Erro ao carregar palavras para o jogo de ditado:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  check: (req, res) => {
    const { word, answer, currentWordIndex, correctAnswers } = req.body;
    const words = req.session.words;

    if (!words || words.length === 0 || !words[currentWordIndex]) {
      return res.status(500).send('Erro: palavras não encontradas na sessão.');
    }

    const isCorrect = word.toLowerCase().trim() === answer.toLowerCase().trim();

    let showWriteInput = currentWordIndex < 5 || currentWordIndex >= 10;
    let showSpeakBtn = currentWordIndex < 10;
    let showSpeakAnswerBtn = currentWordIndex >= 5;

    if (isCorrect) {
      const updatedCorrectAnswers = parseInt(correctAnswers) + 1;

      if (parseInt(currentWordIndex) + 1 < 15) {
        const nextWordIndex = parseInt(currentWordIndex) + 1;

        if (nextWordIndex >= 5 && nextWordIndex < 10) {
          showWriteInput = false;
          showSpeakAnswerBtn = true;
          showSpeakBtn = true;
        } else if (nextWordIndex >= 10) {
          showWriteInput = false;
          showSpeakAnswerBtn = true;
          showSpeakBtn = false;
        }

        res.render('spellingAudio', {
          title: 'Spelling with Sound',
          words,
          currentWordIndex: nextWordIndex,
          correctAnswers: updatedCorrectAnswers,
          feedback: 'Correto!',
          showWriteInput,
          showSpeakBtn,
          showSpeakAnswerBtn
        });
      } else {
        res.render('pageSucesso', {
          title: 'Success',
          correctAnswers: updatedCorrectAnswers
        });
      }
    } else {
      res.render('spellingAudio', {
        title: 'Spelling with Sound',
        words,
        currentWordIndex: parseInt(currentWordIndex),
        correctAnswers: parseInt(correctAnswers),
        feedback: 'Errado, tente novamente.',
        showWriteInput,
        showSpeakBtn,
        showSpeakAnswerBtn
      });
    }
  },
};

module.exports = spellingAudioController;
