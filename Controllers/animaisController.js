const Pets = require('../models/animais');

let pets = []; // Aqui você pode usar uma fonte de dados real

exports.createPet = (req, res) => {
  const newPet = Pets.create(pets, req.body);
  res.status(201).json(newPet);
};

exports.listAllPets = (req, res) => {
  res.json(Pets.listAllPets(pets));
};

exports.listAvailablePets = (req, res) => {
  res.json(Pets.listAvailablePets(pets));
};

exports.getPetById = (req, res) => {
  const pet = Pets.findById(pets, parseInt(req.params.id));
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: 'Pet não encontrado' });
  }
};

exports.updatePet = (req, res) => {
  const updatedPet = Pets.update(pets, parseInt(req.params.id), req.body);
  if (updatedPet) {
    res.json(updatedPet);
  } else {
    res.status(404).json({ message: 'Pet não encontrado' });
  }
};

exports.deletePet = (req, res) => {
  const success = Pets.delete(pets, parseInt(req.params.id));
  if (success) {
    res.json({ message: 'Pet deletado com sucesso!' });
  } else {
    res.status(404).json({ message: 'Pet não encontrado' });
  }
};
module.exports = exports;