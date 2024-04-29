const { Pets, adicionarPet, editarPet } = require('./animais.js');

class Adocao {
  constructor(id, tutor, pet) {
    this.id = id;
    this.tutor = tutor;
    this.pet = pet;
  }
}

// Função para verificar se há um pet para adotar
function verificarPetParaAdotar(pets) {
  for (let i = 0; i < pets.length; i++) {
    if (!pets[i].tutor) {
      return pets[i];
    }
  }
  return null;
}

// Função para adotar um pet
function adotarPet(id, tutor, pets) {
  const pet = verificarPetParaAdotar(pets);
  if (pet) {
    const adocao = new Adocao(id, tutor, pet);
    pet.tutor = tutor;
    return adocao;
  } else {
    return 'Desculpe, não há pets disponíveis para adoção no momento.';
  }
}

module.exports = { Adocao, verificarPetParaAdotar, adotarPet };
