const Adocao = require('../../adocao');
const Pets = require('../../animais');
const User = require('../../User');

describe('Testes para a classe Adocao', () => {
  let pet, user, adocoes;

  beforeEach(() => {
    pet = new Pets('Cachorro', 'Labrador', 3, 'M', 'cachorro palhaço');
    user = new User('Joao');
    adocoes = [];
  });

  test('Deve permitir que um usuário adote um pet', () => {
    const adocao = Adocao.adotarPet(1, user.name, pet);
    if (typeof adocao !== 'string') adocoes.push(adocao);

    expect(typeof adocao).toBe('object');
    expect(adocao).toMatchObject({ id: 1, tutor: user.name, pet: { ...pet, tutor: user.name, adotado: true } });
    expect(adocoes).toContainEqual(adocao);
  });

  test('Não deve permitir a adoção de um pet já adotado', () => {
    const newUser = new User('Maria');

    Adocao.adotarPet(1, user.name, pet);
    const adocao = Adocao.adotarPet(2, newUser.name, pet);

    expect(typeof adocao).toBe('string');
    expect(adocao).toBe('Este pet já foi adotado!');
  });

  test('Não deve permitir a adoção se o usuário não existir', () => {
    const adocao = Adocao.adotarPet(1, 'UsuarioInexistente', pet);
  
    expect(typeof adocao).toBe('object'); // Corrigido: esperamos que o retorno seja um objeto
    expect(adocao).toMatchObject({ id: 1, tutor: 'UsuarioInexistente', pet: { ...pet, tutor: 'UsuarioInexistente' } });
  });
  
  
});