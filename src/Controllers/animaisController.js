const PetsService = require('../services/petsService');

exports.createPet = async (req, res) => {
  try {
    const newPet = await PetsService.create(req.body);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pet' });
  }
};

exports.listAllPets = async (req, res) => {
  try {
    const pets = await PetsService.listAllPets();
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar pets', error: error.message });
  }
};


exports.listAvailablePets = async (req, res) => {
  try {
    const availablePets = await PetsService.listAvailablePets(); // Chama o método do serviço 'Pets'.
    res.json(availablePets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pets disponíveis' });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await PetsService.findById(parseInt(req.params.id));
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pet' });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updatedPet = await PetsService.update(parseInt(req.params.id), req.body);
    if (updatedPet) {
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pet' });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const success = await PetsService.delete(parseInt(req.params.id));
    if (success) {
      res.json({ message: 'Pet deletado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Pet não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar pets', error: error.message });
  }
};

module.exports = exports;