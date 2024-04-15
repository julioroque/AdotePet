class Animais {
    constructor(id, nome, tipo, idade, descricao) {
      this.id = id;
      this.nome = nome;
      this.tipo = tipo;
      this.idade = idade;
      this.descricao = descricao;
    }
  }
  
  // Lista de animais
  let animais = [];
  
  // Função para adicionar um animal
  function adicionarAnimal(nome, tipo, idade, descricao) {
    const id = animais.length + 1;
    const animal = new Animais(id, nome, tipo, idade, descricao);
    animais.push(animal);
  }
  
  // Método para editar um animal
  function editarAnimal(id, novoNome, novoTipo, novaIdade, novaDescricao) {
    const animal = encontrarAnimalPorId(id);
    if (!animal) {
      throw new Error('Animal não encontrado');
    }
  
    animal.nome = novoNome || animal.nome;
    animal.tipo = novoTipo || animal.tipo;
    animal.idade = novaIdade || animal.idade;
    animal.descricao = novaDescricao || animal.descricao;
  }
  
  // Método para listar todos os animais
  function listarAnimais() {
    return animais;
  }
  
  // Método para encontrar um animal por ID
  function encontrarAnimalPorId(id) {
    return animais.find(animal => animal.id === id);
  }
  
  // Método para remover um animal por ID
  function removerAnimalPorId(id) {
    const index = animais.findIndex(animal => animal.id === id);
    if (index !== -1) {
      animais.splice(index, 1);
    }
  }
  
  module.exports = { adicionarAnimal, editarAnimal, listarAnimais, encontrarAnimalPorId, removerAnimalPorId };
  