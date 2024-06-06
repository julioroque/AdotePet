const Pets = require('./animais'); 
const User = require('./User');

class Adocao {
  constructor(id, tutor, pet) {
    this.id = id; // ID único da adoção
    this.tutor = tutor; // Tutor que adotou o animal
    this.pet = pet; // Dados do animal adotado
  }

  // Método para adotar um animal 
  static adotarPet(adocoes, users, id, userId, pet) {
    const tutor = User.findById(users, userId);
    if (!tutor) {
      return 'Usuário não encontrado';
    }

    if (!pet.adotado) {
      const adocao = new Adocao(id, tutor, pet); // Cria uma nova adoção com os dados fornecidos
      tutor.adoptedPets.push(pet); // Adiciona o pet à lista de pets adotados pelo usuário
      pet.tutor = tutor; // Define o tutor para o animal adotado
      pet.adotado = true; // Marca o animal como adotado
      adocoes.push(adocao); // Adiciona a adoção à lista de adoções
      return adocao; // Retorna a adoção realizada
    } else {
      return 'Este pet já foi adotado!'; // Retorna mensagem se o pet já estiver sido adotado
    }
  }

  // No método para listar adoções
static listAdocoes(adocoes) {
  return adocoes.map(adocao => this.renderAdocao(adocao));
}

// No método renderAdocao
static renderAdocao(adocao) {
  return {
    id: adocao.id,
    tutor: adocao.tutor.name, // Use apenas o ID do tutor
    pet: Pets.renderPet(adocao.pet) // Renderize o pet da adoção
  };
}

}

module.exports = Adocao;
