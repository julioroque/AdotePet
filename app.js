const express = require('express');
const app = express();
const User = require('./User');
const Pets = require('./animais');
const Adocao = require('./adocao');

app.use(express.json()); // Middleware para o Express reconhecer JSON no corpo da requisição

let users = []; // Array de usuários
let pets = []; // Array de pets
let adocoes = []; // Array de adoções

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
