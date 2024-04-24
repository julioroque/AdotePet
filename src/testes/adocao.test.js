const { Adocao, verificarPetParaAdotar, adotarPet } = require('../../adocao.js');
const { Pets, adicionarPet, editarPet } = require('../../animais.js');

describe('Testes de adoção', () => {
  let pets = [];
  beforeAll(() => {
    pets.push(adicionarPet(1, 'Cachorro', 'Labrador', 2, 'Macho', 'Amigável'));
    pets.push(adicionarPet(2, 'Gato', 'Siames', 3, 'Fêmea', 'Independente'));
  });
  
  test('verificarPetParaAdotar deve retornar um pet para adotar', () => {
    const pet = verificarPetParaAdotar(pets);
    expect(pet).toBeTruthy();
  });

  test('adotarPet deve retornar uma nova adoção', () => {
    const adocao = adotarPet(1, 'João', pets);
    expect(adocao).toBeInstanceOf(Adocao);
    expect(adocao.pet.tutor).toBe('João');
  });
});