

const { adicionarAnimal, editarAnimal, listarAnimais, encontrarAnimalPorId, removerAnimalPorId } = require('../../animais');

test('adicionarAnimal adiciona um animal à lista', () => {
  adicionarAnimal('Rex', 'Cachorro', 5, 'Cachorro brincalhão');
  console.log('adiciona um animal à lista  =>    ', listarAnimais());
  expect(listarAnimais().length).toBe(1);
});


test('editarAnimal edita os detalhes de um animal', () => {
    adicionarAnimal('Mia', 'Gato', 3, 'Gato preguiçoso');
    editarAnimal(2, 'Miau', 'Gato', 4, 'Gato energético');
    const animal = encontrarAnimalPorId(2);
    console.log('edita os detalhes de um animal =>       ', animal);
    expect(animal.nome).toBe('Miau');
    expect(animal.idade).toBe(4);
  });