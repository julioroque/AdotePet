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
    

    try {
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
        return this.renderAdocao(adocao); // Retorna a adoção realizada
      } else {
        return 'Este pet já foi adotado!'; // Retorna mensagem se o pet já estiver sido adotado
      }
    } catch (error) {
      console.error('Erro ao adotar pet:', error);
      return 'Erro ao processar a adoção';
    }
  }

  // Método para listar adoções
  static listAdocoes(adocoes) {
    return adocoes.map(adocao => this.renderAdocao(adocao));
  }

  // Método para renderizar uma adoção
  static renderAdocao(adocao) {
    return {
      id: adocao.id,
      tutor: adocao.tutor.name,
      pet: {
        id: adocao.pet.id,
        name: adocao.pet.name,
        adotado: adocao.pet.adotado
      }
    };
  }
}

module.exports = Adocao;
