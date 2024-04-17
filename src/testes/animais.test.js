

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

  test('encontrarAnimalPorId encontra um animal por ID', () => {
    adicionarAnimal('Pipoca', 'Hamster', 2, 'Hamster fofinho');
    const animal = encontrarAnimalPorId(3);
    console.log('encontra um animal por ID  =>    ', animal);
    expect(animal.nome).toBe('Pipoca');
  });

  test('removerAnimalPorId remove um animal por ID', () => {
    adicionarAnimal('Bolota', 'Coelho', 1, 'Coelho saltitante');
    removerAnimalPorId(4);
    const animal = encontrarAnimalPorId(4);
    console.log('remove um animal por ID   =>  ', animal);
    expect(animal).toBeUndefined();
  });