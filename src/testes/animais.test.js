

const { adicionarAnimal, editarAnimal, listarAnimais, encontrarAnimalPorId, removerAnimalPorId } = require('../../animais');

test('adicionarAnimal adiciona um animal à lista', () => {
  adicionarAnimal('Rex', 'Cachorro', 5, 'Cachorro brincalhão');
  console.log('adiciona um animal à lista  =>    ', listarAnimais());
  expect(listarAnimais().length).toBe(1);
});


  