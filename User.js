// Arquivo user.js: Define a classe User para representar usuários
const Pets = require('./animais'); 
class User {
  constructor(id, name, pet) {
    this.id = id; // ID único do usuário
    this.name = name; // Nome do usuário
  }

  // Método estático para renderizar um usuário de forma simplificada
  static renderUser(user, userPets) {
    return {
      id: user.id,
      name: user.name,
      pets: userPets.map(pet => Pets.renderPet(pet)) // Renderiza todos os animais do usuário
    };
  }

  // Método estático para criar um novo usuário
  static create(users, data) {
    const newUser = new User(users.length + 1, data.name); // Cria um novo usuário com um ID incremental
    users.push(newUser); // Adiciona o usuário à lista de usuários
    return this.renderUser(newUser, []); // Renderiza e retorna o novo usuário criado
  }

  // Método estático para listar todos os usuários
  static listAllUsers(users) {
    return users.map(user => this.renderUser(user, [])) // Mapeia e renderiza todos os usuários na lista
  }

  // Método estático para encontrar um usuário pelo ID
  static findById(users, id) {
    return users.find(user => user.id === id); // Encontra e retorna o usuário com o ID especificado
  }

  // Método estático para deletar um usuário
  static delete(users, id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true; // Retorna true se o usuário foi deletado com sucesso
    }
    return false; // Retorna false se o usuário não foi encontrado
  }
}

module.exports = User; // Exporta a classe User para uso em outros arquivos
