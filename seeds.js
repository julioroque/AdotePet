const Pets = require('./Models/animais');
const User = require('./Models/User');
const Adocao = require('./Models/adocao');

const pets = [];
const users = [];
const adocoes = [];

function seed() {
  // Cria alguns pets
  const pet1 = Pets.create(pets, {
    animal: 'Cachorro',
    raca: 'Labrador',
    idade: 3,
    sexo: 'M',
    descricao: 'cachorro palhaço!'
  });

  const pet2 = Pets.create(pets, {
    animal: 'Gato',
    raca: 'Siamês',
    idade: 2,
    sexo: 'F',
    descricao: 'gata surtada'
  });

  const pet3 = Pets.create(pets, {
    animal: 'Cachorro',
    raca: 'Bulldog',
    idade: 4,
    sexo: 'M',
    descricao: 'bulldog que ronca muito'
  });

  const pet4 = Pets.create(pets, {
    animal: 'Gato',
    raca: 'Persa',
    idade: 1,
    sexo: 'F',
    descricao: 'come igual o garfield'
  });

  // Cria alguns usuários
  const user1 = User.create(users, { name: 'Joao' });
  const user2 = User.create(users, { name: 'Leo' });
  const user3 = User.create(users, { name: 'Aline' });

  // Realiza algumas adoções
  const adocao1 = Adocao.adotarPet(1, user1.name, pet1);
  if (typeof adocao1 !== 'string') adocoes.push(adocao1);

  const adocao2 = Adocao.adotarPet(2, user2.name, pet2);
  if (typeof adocao2 !== 'string') adocoes.push(adocao2);

  const adocao3 = Adocao.adotarPet(3, user1.name, pet3);
  if (typeof adocao3 !== 'string') adocoes.push(adocao3);

  // Tentativa de adoção de um pet já adotado
  const adocao4 = Adocao.adotarPet(4, user3.name, pet1);
  if (typeof adocao4 !== 'string') adocoes.push(adocao4);

  // Adição de mais adoções se necessário
  const adocao5 = Adocao.adotarPet(5, user3.name, pet4);
  if (typeof adocao5 !== 'string') adocoes.push(adocao5);
}

seed();

module.exports = { pets, users, adocoes };
