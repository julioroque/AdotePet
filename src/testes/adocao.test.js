const { Adocao, verificarPetParaAdotar, adotarPet } = require('../../adocao.js');
const { Pets, adicionarPet, editarPet } = require('../../animais.js');

describe('Testes de adoção', () => {
  let pets = [];
  beforeAll(() => {
    pets.push(adicionarPet(1, 'Cachorro', 'Labrador', 2, 'Macho', 'Amigável'));
    pets.push(adicionarPet(2, 'Gato', 'Siames', 3, 'Fêmea', 'Independente'));
  });
  