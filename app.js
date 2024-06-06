const express = require('express');
const app = express();
const User = require('./Models/User');
const Pets = require('./Models/animais');
const Adocao = require('./Models/adocao');

app.use(express.json()); // Middleware para o Express reconhecer JSON no corpo da requisição

let users = [];
let pets = [];
let adocoes = [];

// Rota inicial
app.get('/', (req, res) => {
  res.send('Olá Tutores!');
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const user = User.create(users, req.body);
  res.status(201).json(User.renderUser(user, [])); // Renderiza o usuário sem animais (por enquanto)
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  const userList = User.listAllUsers(users);
  res.json(userList);
});

// Rota para listar todos os animais de um usuário específico
app.get('/users/:id/pets', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = User.findById(users, userId);
  if (user) {
    const userPets = pets.filter(pet => pet.tutor && pet.tutor.id === userId);
    res.json(User.renderUser(user, userPets)); // Renderiza o usuário com seus animais
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

// Rota para adotar um pet
app.post('/adoptions', (req, res) => {
  const { tutorId, petId } = req.body;

  const tutor = User.findById(users, tutorId); // Encontra o tutor pelo ID
  const pet = Pets.findById(pets, petId); // Encontra o pet pelo ID

  if (!tutor) {
    res.status(400).send('Tutor não encontrado!');
  } else if (!pet) {
    res.status(400).send('Pet não encontrado!');
  } else if (pet.adotado) {
    res.status(400).send('Este pet já foi adotado!');
  } else {
    const adocao = Adocao.adotarPet(adocoes.length + 1, tutor, pet);
    adocoes.push(adocao);
    res.status(201).json(Adocao.renderAdocao(adocao));
  }
});
// Rota para listar todas as adoções
app.get('/adoptions', (req, res) => {
  const adocaoList = Adocao.listAdocoes(adocoes);
  res.json(adocaoList);
});

// Rota para listar adoções por tipo (cachorro ou gato)
app.get('/adoptions/:type', (req, res) => {
  const type = req.params.type.toLowerCase();
  const filteredAdoptions = adocoes.filter(adocao => adocao.pet.animal.toLowerCase() === type);
  res.json(filteredAdoptions.map(adocao => Adocao.renderAdocao(adocao)));
});

// Rota para criar um novo animal
app.post('/pets', (req, res) => {
  const pet = Pets.create(pets, req.body);
  res.status(201).json(Pets.renderPet(pet)); // Renderiza e retorna o novo animal criado
});

// Rota para listar todos os animais
app.get('/pets', (req, res) => {
  const petList = Pets.listAllPets(pets);
  res.json(petList);
});

// Rota para atualizar um animal
app.put('/pets/:id', (req, res) => {
  const updatedPet = Pets.update(pets, parseInt(req.params.id), req.body);
  if (updatedPet) {
    res.json(Pets.renderPet(updatedPet)); // Renderiza o animal atualizado
  } else {
    res.status(404).send('Pet não encontrado!');
  }
});

// Rota para deletar um animal
app.delete('/pets/:id', (req, res) => {
  const success = Pets.delete(pets, parseInt(req.params.id));
  if (success) {
    res.status(204).send(); // Retorna código 204 (No Content) se o animal foi deletado
  } else {
    res.status(404).send('Pet não encontrado!');
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
