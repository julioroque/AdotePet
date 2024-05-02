const express = require('express');
const app = express();
const Pets = require('./animais');
const Adocao = require('./adocao');

// Middleware para o Express reconhecer JSON no corpo da requisição
app.use(express.json());

// Array de pets, futuramente será um banco de dados
let pets = [];

// Array de adoções, futuramente será um banco de dados
let adocoes = [];

// Rota inicial
app.get('/', (req, res) => {
  res.send('Olá Tutores!');
});

// Salvar um pet
app.post('/pets', (req, res) => {
  const pet = Pets.create(pets, req.body);
  res.status(201).json(Pets.renderPet(pet));
});

// Listar todos os pets
app.get('/pets', (req, res) => {
  const petList = Pets.listAllPets(pets);
  res.json(petList);
});

// Atualizar um pet
app.put('/pets/:id', (req, res) => {
  const updatedPet = Pets.update(pets, parseInt(req.params.id), req.body);
  if (updatedPet) {
    res.json(Pets.renderPet(updatedPet));
  } else {
    res.status(404).send('Pet não encontrado!!');
  }
});

// Deletar um pet
app.delete('/pets/:id', (req, res) => {
  const success = Pets.delete(pets, parseInt(req.params.id));
  if (success) {
    res.status(204).send('Pet Adotado');
  } else {
    res.status(404).send('Pet não encontrado!!');
  }
});

// Adotar um pet
app.post('/adocoes', (req, res) => {
  const { tutor } = req.body;
  const adocao = Adocao.adotarPet(adocoes.length + 1, tutor, pets);
  if (typeof adocao === 'string') {
    res.status(400).send(adocao); // Pet não disponível para adoção
  } else {
    adocoes.push(adocao);
    res.status(201).json(Adocao.renderAdocao(adocao));
  }
});

// Listar todas as adoções
app.get('/adocoes', (req, res) => {
  const adocaoList = Adocao.listAdocoes(adocoes);
  res.json(adocaoList);
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
