const axios = require('axios');
const Card = require('../models/Card');

const indexController = {
    index: async (req, res) => {
        res.render('index', {
            title: 'Jogo - Início',
        });
    },

    createWordForm: (req, res) => {
        res.render('createWord', {
            title: 'Criar Nova Palavra',
        });
    },

    createWord: async (req, res) => {
        try {
            const { word, imageUrl } = req.body;

            if (!word || !imageUrl || !Array.isArray(word) || !Array.isArray(imageUrl)) {
                return res.status(400).send('Palavras e URLs de imagem são obrigatórias.');
            }

            let addedCount = 0;

            for (let i = 0; i < word.length; i++) {
                if (word[i] && imageUrl[i]) {
                    const response = await axios({
                        method: 'post',
                        url: 'https://api.cognitive.microsofttranslator.com/translate',
                        headers: {
                            'Ocp-Apim-Subscription-Key': '2929fa2632cd4b76ac3ab87cef23fdc7',
                            'Ocp-Apim-Subscription-Region': 'eastus',
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'api-version': '3.0',
                            'from': 'en',
                            'to': 'pt'
                        },
                        data: [{
                            'Text': word[i]
                        }]
                    });

                    const translation = response.data[0].translations[0].text;

                    await Card.create({
                        word: word[i],
                        translation,
                        imageUrl: imageUrl[i]
                    });

                    addedCount++; // Incrementa o contador para cada palavra adicionada com sucesso
                }
            }

            // Passar a contagem para a página de sucesso
            res.render('successWord', {
                title: 'Palavra Criada',
                addedCount
            });
        } catch (error) {
            console.error('Erro ao criar palavra:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },

  listWords: async (req, res) => {
    try {
      const words = await Card.findAll();
      res.render('listWords', {
        title: 'Lista de Palavras',
        words
      });
    } catch (error) {
      console.error('Erro ao listar palavras:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  successWord: (req, res) => {
    res.render('successWord', {
      title: 'Palavra Criada',
    });
  },

    pageSucesso: (req, res) => {
      res.render('pageSucesso', {
        title: 'Sucesso',
        correctAnswers: req.query.correctAnswers || 0
      });
    }
  };
  
  

module.exports = indexController;
