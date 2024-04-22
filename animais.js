class Pets {
  constructor(id, animal, raca, idade, sexo, descricao) {
    this.id = id;
    this.animal = animal;
    this.raca = raca;
    this.idade = idade;
    this.sexo = sexo;
    this.descricao = descricao;
  }
}

// Função para adicionar um animal
function adicionarPet(id, animal, raca, idade, sexo, descricao) {
  const pet = new Pets(id, animal, raca, idade, sexo, descricao);
  return pet;
}

// Método para editar um animal
function editarPet(pet, novaRaca, novaIdade, novoSexo, novaDescricao) {
  pet.raca = novaRaca || pet.raca;
  pet.idade = novaIdade || pet.idade;
  pet.sexo = novoSexo || pet.sexo;
  pet.descricao = novaDescricao || pet.descricao;
}

module.exports = {Pets, adicionarPet, editarPet };

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
