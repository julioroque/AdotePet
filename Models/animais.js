class Pets {
  constructor(id, animal, raca, idade, sexo, descricao) {
    this.id = id;
    this.animal = animal;
    this.raca = raca;
    this.idade = idade;
    this.sexo = sexo;
    this.descricao = descricao;
    this.adotado = false;
  }

  // Método para renderizar um pet com informações específicas
  static renderPet(pet) {
    return {
      id: pet.id,
      animal: pet.animal,
      raca: pet.raca,
      idade: pet.idade,
      sexo: pet.sexo,
      descricao: pet.descricao,
      adotado: pet.adotado // Incluído o status de adotado na renderização
    };
  }

  // Método para criar um novo pet e adicioná-lo à lista de pets
  static create(pets, data) {
    const newPet = new Pets(
      pets.length + 1,
      data.animal,
      data.raca,
      data.idade,
      data.sexo,
      data.descricao
    );
    pets.push(newPet);
    return newPet; // Retorna o novo pet criado
  }

  // Método para listar todos os pets cadastrados
  static listAllPets(pets) {
    return pets.map(pet => this.renderPet(pet));
  }

  // Método para listar pets disponíveis para adoção (ainda não adotados)
  static listAvailablePets(pets) {
    return pets.filter(pet => !pet.adotado).map(pet => this.renderPet(pet));
  }

  // Método para listar pets já adotados.
  static listAdoptedPets(pets) {
    return pets.filter(pet => pet.adotado).map(pet => this.renderPet(pet));
  }

  // Método para listar pets por tipo (animal)
  static listPetsByType(pets, type) {
    return pets.filter(pet => pet.animal.toLowerCase() === type.toLowerCase()).map(pet => this.renderPet(pet));
  }

  // Método para encontrar um pet pelo ID
  static findById(pets, id) {
    return pets.find(pet => pet.id === id);
  }

  // Método para atualizar informações de um pet
  static update(pets, id, data) {
    const pet = this.findById(pets, id);
    if (pet) {
      pet.animal = data.animal || pet.animal;
      pet.raca = data.raca || pet.raca;
      pet.idade = data.idade || pet.idade;
      pet.sexo = data.sexo || pet.sexo;
      pet.descricao = data.descricao || pet.descricao;
      pet.adotado = data.adotado !== undefined ? data.adotado : pet.adotado; // Atualiza o status de adotado se fornecido
      return pet; // Retorna o pet atualizado
    }
    return null; // Retorna null se o pet não for encontrado
  }

  // Método para deletar um pet pelo ID
  static delete(pets, id) {
    const pet = this.findById(pets, id);
    if (pet) {
      const index = pets.indexOf(pet);
      pets.splice(index, 1);
      return true; // Retorna true se o pet foi deletado com sucesso
    }
    return false; // Retorna false se o pet não foi encontrado
  }
}

module.exports = Pets;
