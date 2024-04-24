const { Pets, adicionarPet, editarPet } = require('../../animais');

describe('Testes para animais.js', () => {
  let pet;

  beforeEach(() => {
    pet = adicionarPet(1, 'Cachorro', 'pinscher', 2, 'Macho', 'Bom cachorro');
  });

  test('adicionarPet deve retornar um novo animal', () => {
    expect(pet).toEqual({
      id: 1,
      animal: 'Cachorro',
      raca: 'pinscher',
      idade: 2,
      sexo: 'Macho',
      descricao: 'Bom cachorro'
    });
  });

  test('editarPet deve editar os detalhes do animal', () => {
    editarPet(pet, 'Gato', 3, 'Fêmea', 'Gato preguiçoso');
    expect(pet).toEqual({
      id: 1,
      animal: 'Cachorro',
      raca: 'Gato',
      idade: 3,
      sexo: 'Fêmea',
      descricao: 'Gato preguiçoso'
    });
  });
});