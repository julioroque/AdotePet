const Adocao = require('../models/Adocao');
const User = require('../models/User');
const Pets = require('../models/animais');

exports.createAdocao = (req, res) => {
  try {
    const { id, userId, petId } = req.body;
    const users = req.app.locals.users; // Pega os usuários do app locals
    const pets = req.app.locals.pets; // Pega os pets do app locals
    const adocoes = req.app.locals.adocoes; // Pega as adoções do app locals
    const pet = Pets.findById(pets, petId);

    if (!pet) {
      return res.status(400).json({ message: 'Pet não encontrado' });
    }

    const adocao = Adocao.adotarPet(adocoes, users, id, userId, pet);
    if (typeof adocao === 'string') {
      return res.status(400).json({ message: adocao });
    }
    res.status(201).json(adocao);
  } catch (error) {
    console.error('Erro ao criar adoção:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.listAdocoes = (req, res) => {
  try {
    const adocoes = req.app.locals.adocoes; // Pega as adoções do app locals
    res.json(Adocao.listAdocoes(adocoes));
  } catch (error) {
    console.error('Erro ao listar adoções:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
