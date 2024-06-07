const Pets = require('../Models/animais');

let pets = [];

const petController = {
  createPet: (req, res) => {
    const newPet = Pets.create(pets, req.body);
    res.status(201).json(Pets.renderPet(newPet));
  },

  listAllPets: (req, res) => {
    res.status(200).json(Pets.listAllPets(pets));
  },

  listAvailablePets: (req, res) => {
    res.status(200).json(Pets.listAvailablePets(pets));
  },

  listAdoptedPets: (req, res) => {
    res.status(200).json(Pets.listAdoptedPets(pets));
  },

  listPetsByType: (req, res) => {
    const type = req.params.type;
    res.status(200).json(Pets.listPetsByType(pets, type));
  },

  updatePet: (req, res) => {
    const pet = Pets.update(pets, req.params.id, req.body);
    if (pet) {
      res.status(200).json(Pets.renderPet(pet));
    } else {
      res.status(404).json({ error: 'Pet não encontrado!' });
    }
  },

  deletePet: (req, res) => {
    if (Pets.delete(pets, req.params.id)) {
      res.status(200).json({ message: 'Pet deletado com sucesso!' });
    } else {
      res.status(404).json({ error: 'Pet não encontrado' });
    }
  }
};

module.exports = petController;
