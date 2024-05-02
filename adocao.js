const { Pets, adicionarPet, editarPet, deletarPet } = require('./animais.js');

class Adocao {
  constructor(id, tutor, pet) {
    this.id = id;
    this.tutor = tutor;
    this.pet = pet;
  }

  static verificarPetParaAdotar(pets) {
    for (let i = 0; i < pets.length; i++) {
      if (!pets[i].tutor) {
        return pets[i];
      }
    }
    return null;
  }

  static adotarPet(id, tutor, pets) {
    const pet = this.verificarPetParaAdotar(pets);
    if (pet) {
      const adocao = new Adocao(id, tutor, pet);
      pet.tutor = tutor;
      // Remover o pet adotado da lista de pets
      deletarPet(pets, pet.id);
      return adocao;
    } else {
      return 'Desculpe, não há pets disponíveis para adoção no momento.';
    }
  }

  static renderAdocao(adocao) {
    return {
      id: adocao.id,
      tutor: adocao.tutor,
      pet: adocao.pet,
    };
  }

  static listAdocoes(adocoes) {
    return adocoes.map(adocao => this.renderAdocao(adocao));
  }

  static findAdocaoById(adocoes, id) {
    return adocoes.find(adocao => adocao.id === id);
  }

  static editarAdocao(adocoes, id, tutor, pet) {
    const adocao = this.findAdocaoById(adocoes, id);
    if (adocao) {
      adocao.tutor = tutor || adocao.tutor;
      adocao.pet = pet || adocao.pet;
      return this.renderAdocao(adocao);
    }
    return null;
  }
}

module.exports = Adocao;
