const User = require('../../User');
const Pets = require('../../animais');

describe('Testes para a classe User', () => {
  let user, pet;

  beforeEach(() => {
    user = new User(1, 'Joao');
    pet = new Pets('Cachorro', 'Labrador', 3, 'M', 'cachorro palhaço');
  });

  test('Deve criar um novo usuário', () => {
    const userData = { name: 'Maria' };
    const newUser = User.create([], userData);

    expect(newUser).toMatchObject({ id: 1, name: 'Maria', pets: [] });
  });

  test('Deve listar todos os usuários', () => {
    const users = [user];
    const allUsers = User.listAllUsers(users);

    expect(allUsers).toContainEqual(User.renderUser(user, []));
  });

  test('Deve encontrar um usuário pelo ID', () => {
    const users = [user];
    const foundUser = User.findById(users, user.id);

    expect(foundUser).toEqual(user);
  });

  test('Deve deletar um usuário pelo ID', () => {
    const users = [user];
    const result = User.delete(users, user.id);

    expect(result).toBeTruthy();
    expect(users).not.toContainEqual(user);
  });

  test('Deve renderizar um usuário com seus pets', () => {
    
    const pets = [pet];
    user.pets = pets; // Assumindo que User tem uma propriedade pets

    const renderedUser = User.renderUser(user, user.pets);

    expect(renderedUser).toMatchObject({
      id: user.id,
      name: user.name,
      pets: pets.map(p => ({ ...p }))
    });
  });
});
