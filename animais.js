class Pets {
  constructor(id, animal, raca, idade, sexo, descricao) {
    this.id = id;
    this.animal = animal;
    this.raca = raca;
    this.idade = idade;
    this.sexo = sexo;
    this.descricao = descricao;
    this.adotado = false; // Adicionando o atributo adotado para controle de adoção
  }

  // Método para renderizar um pet com informações específicas
  static renderPet(pet) {
    return {
      id: pet.id,
      animal: pet.animal,
      raca: pet.raca,
      idade: pet.idade,
      sexo: pet.sexo,
      descricao: pet.descricao,
      adotado: pet.adotado // Incluído o status de adotado na renderização
    };
  }

  // Método para criar um novo pet e adicioná-lo à lista de pets
  static create(pets, data) {
    const newPet = new Pets(
      pets.length + 1,
      data.animal,
      data.raca,
      data.idade,
      data.sexo,
      data.descricao
    );
    pets.push(newPet);
    return newPet; // Retorna o novo pet criado
  }}