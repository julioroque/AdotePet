const { User, Pets } = require('../Models');

class UserService {
  static async create(data) {
    const newUser = await User.create({ name: data.name });
    return UserService.renderUser(newUser);
  }

  static async listAllUsers() {
    const users = await User.findAll();
    return users.map(user => UserService.renderOnlyUser(user));
  }

  static async findById(id) {
    return await User.findByPk(id);
  }

  static async delete(id) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }

  static renderUser(user) {
    return {
      id: user.id,
      name: user.name,
      pets: user.adoptedPets ? user.adoptedPets.map(pet => PetsService.renderPet(pet)) : []
    };
  }
  

  static renderOnlyUser(user) {
    return {
      id: user.id,
      name: user.name,
    };
  }
}

module.exports = UserService;
