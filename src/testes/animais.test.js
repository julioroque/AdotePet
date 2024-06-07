const Pets = require('../../animais');

describe('Testes para a classe Pets', () => {
  let pet;

  beforeEach(() => {
    pet = new Pets('Cachorro', 'Labrador', 3, 'M', 'cachorro palhaço');
  });

  test('Deve criar um novo pet', () => {
    const petData = { animal: 'Gato', raca: 'Siamês', idade: 2, sexo: 'F', descricao: 'gata surtada' };
    const newPet = Pets.create([], petData);

    expect(newPet).toMatchObject(petData);
  });

  test('Deve listar todos os pets', () => {
    const pets = [pet];
    const allPets = Pets.listAllPets(pets);

    expect(allPets).toContainEqual(pet);
  });

  test('Deve encontrar um pet pelo ID', () => {
    const pets = [pet];
    const foundPet = Pets.findById(pets, pet.id);

    expect(foundPet).toEqual(pet);
  });

  test('Deve deletar um pet pelo ID', () => {
    const pets = [pet];
    const result = Pets.delete(pets, pet.id);

    expect(result).toBeTruthy();
    expect(pets).not.toContainEqual(pet);
  });
});