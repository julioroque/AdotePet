const Adocao = require('../Models/adocao.js');
const Pets = require('../Models/animais.js');
const User = require('../Models/User.js');

let adocoes = [];

const adocaoController = {
  adotarPet: (req, res) => {
    const { userId, petId } = req.body;
    const user = User.findById(users, userId);
    const pet = Pets.findById(pets, petId);

    if (user && pet) {
      const novaAdocao = Adocao.adotarPet(adocoes.length + 1, user, pet);
      adocoes.push(novaAdocao);
      res.status(200).json(Adocao.renderAdocao(novaAdocao));
    } else {
      res.status(404).json({ error: 'Usuário ou Pet não encontrado' });
    }
  },

  listAdocoes: (req, res) => {
    res.status(200).json(Adocao.listAdocoes(adocoes));
  }
};

module.exports = adocaoController;
