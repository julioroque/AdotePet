const Adocao = require('../models/Adocao');
const User = require('../models/User');
const Pets = require('../models/animais');

exports.createAdocao = (req, res) => {
  const { id, userId, petId } = req.body;
  const users = User.listAllUsers(); // Pega todos os usuários
  const pets = Pets.listAllPets(); // Pega todos os pets
  const pet = Pets.findById(pets, petId);
  const adocoes = []; // Aqui você pode usar uma fonte de dados real

  const adocao = Adocao.adotarPet(adocoes, users, id, userId, pet);
  if (typeof adocao === 'string') {
    return res.status(400).json({ message: adocao });
  }
  res.status(201).json(adocao);
};

exports.listAdocoes = (req, res) => {
  const adocoes = []; // Aqui você pode usar uma fonte de dados real
  res.json(Adocao.listAdocoes(adocoes));
};

module.exports = exports;