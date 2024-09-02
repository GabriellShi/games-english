const axios = require('axios');
const Card = require('../models/Card');
const fs = require('fs');
const path = require('path');

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
        const imageFiles = req.files ? req.files : [];

        if (!word || (!imageUrl && !imageFiles.length) || !Array.isArray(word) || (!Array.isArray(imageUrl) && !imageFiles.length)) {
            return res.status(400).send('Palavras e URLs ou Arquivos de imagem são obrigatórios.');
        }

        let addedCount = 0;

        for (let i = 0; i < word.length; i++) {
            if (word[i] && (imageUrl[i] || imageFiles[i])) {
                let imageUrlToSave = imageUrl[i];

                if (imageFiles[i]) {
                    // Se houver um arquivo anexado, faça upload dele para o BunnyCDN
                    const filePath = imageFiles[i].path;

                    const bunnyApiKey = '249abfc1-dd00-45d2-bb37a0d15796-4634-4c06'; // Substitua pela chave correta
                    const bunnyStorageZone = 'animes-cold'; // Substitua pelo nome correto da zona de armazenamento
                    const bunnyStoragePath = `/${bunnyStorageZone}/${imageFiles[i].filename}`;

                    const fileData = fs.readFileSync(filePath);

                    const response = await axios.put(
                        `https://br.storage.bunnycdn.com${bunnyStoragePath}`,
                        fileData,
                        {
                            headers: {
                                'AccessKey': bunnyApiKey,
                                'Content-Type': 'application/octet-stream'
                            }
                        }
                    );

                    if (response.status === 201) {
                        imageUrlToSave = `https://animescold.b-cdn.net/${imageFiles[i].filename}`;
                    } else {
                        throw new Error('Upload para o BunnyCDN falhou');
                    }

                    // Remove o arquivo do servidor após o upload
                    fs.unlinkSync(filePath);
                }
                    const translationResponse = await axios({
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

                    const translation = translationResponse.data[0].translations[0].text;

                    await Card.create({
                        word: word[i],
                        translation,
                        imageUrl: imageUrlToSave
                    });

                    addedCount++; // Incrementa o contador para cada palavra adicionada com sucesso
                }
            }

            res.render('successWord', {
                title: 'Word Created',
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
                title: 'Word List',
                words
            });
        } catch (error) {
            console.error('Erro ao listar palavras:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    successWord: (req, res) => {
        res.render('successWord', {
            title: 'Word Created',
        });
    },

    pageSucesso: (req, res) => {
        res.render('pageSucesso', {
            title: 'Success',
            correctAnswers: req.query.correctAnswers || 0
        });
    },

    wordList: async (req, res) => {
        try {
            const cards = await Card.findAll(); // Busca todos os registros da tabela "cards"
            res.render('wordList', {
                title: 'Word List',
                cards, // Passa os dados para a visão
            });
        } catch (error) {
            console.error('Erro ao buscar os cards:', error);
            res.status(500).send('Erro ao buscar os cards');
        }
    },

    deleteWord: async (req, res) => {
        try {
            const { id } = req.params;
            await Card.destroy({ where: { id } }); // Deleta o card do banco de dados
            res.redirect('/wordList'); // Redireciona de volta para a lista de palavras
        } catch (error) {
            console.error('Erro ao deletar o card:', error);
            res.status(500).send('Erro ao deletar o card');
        }
    }
};

module.exports = indexController;
