// Arquivo adocao.js: Define a classe Adocao para representar adoções de animais
const Pets = require('./animais'); // Importa a classe Pets para usar na lógica de adoção

class Adocao {
  constructor(id, tutor, pet) {
    this.id = id; // ID único da adoção
    this.tutor = tutor; // Tutor que adotou o animal
    this.pet = pet; // Dados do animal adotado
  }

  // Método estático para adotar um animal 
  static adotarPet(id, tutor, pet) {
    if (!pet.adotado) {
      const adocao = new Adocao(id, tutor, pet); // Cria uma nova adoção com os dados fornecidos
      pet.tutor = tutor; // Define o tutor para o animal adotado
      pet.adotado = true; // Marca o animal como adotado
      return adocao; // Retorna a adoção realizada
    } else {
      return 'Este pet já foi adotado!'; // Retorna mensagem se o pet já estiver sido adotado
    }
  }

  // Método estático para listar todas as adoções
  static listAdocoes(adocoes) {
    return adocoes.map(adocao => this.renderAdocao(adocao)); // Mapeia todas as adoções e renderiza cada uma delas
  }

  // Método estático para renderizar uma adoção de forma simplificada
  static renderAdocao(adocao) {
    return {
      id: adocao.id,
      tutor: adocao.tutor,
      pet: Pets.renderPet(adocao.pet) // Renderiza o pet da adoção
    };
  }
}

module.exports = Adocao; // Exporta a classe Adocao para uso em outros arquivos

