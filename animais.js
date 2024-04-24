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


