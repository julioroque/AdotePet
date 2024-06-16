const { Pets } = require('../Models');

class PetsService {
  static async create(data) {
    const newPet = await Pets.create({
      animal: data.animal,
      raca: data.raca,
      idade: data.idade,
      sexo: data.sexo,
      descricao: data.descricao
    });
    return newPet;
  }

  static async listAllPets() {
    const pets = await Pets.findAll();
    return pets.map(pet => PetsService.renderPet(pet));
  }

  static async listAvailablePets() {
    const pets = await Pets.findAll({ where: { adotado: false } });
    return pets.map(pet => PetsService.renderPet(pet));
  }

  static async listAdoptedPets() {
    const pets = await Pets.findAll({ where: { adotado: true } });
    return pets.map(pet => PetsService.renderPet(pet));
  }

  static async listPetsByType(type) {
    const pets = await Pets.findAll({ where: { animal: type.toLowerCase() } });
    return pets.map(pet => PetsService.renderPet(pet));
  }

  static async findById(id) {
    return await Pets.findByPk(id);
  }

  static async update(id, data) {
    const pet = await PetsService.findById(id);
    if (pet) {
      await pet.update(data);
      return pet;
    }
    return null;
  }

  static async delete(id) {
    const pet = await PetsService.findById(id);
    if (pet) {
      await pet.destroy();
      return true;
    }
    return false;
  }

  static renderPet(pet) {
    return {
      id: pet.id,
      animal: pet.animal,
      raca: pet.raca,
      idade: pet.idade,
      sexo: pet.sexo,
      descricao: pet.descricao,
      adotado: pet.adotado
    };
  }
}

module.exports = PetsService;
