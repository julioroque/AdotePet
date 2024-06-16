const request = require('supertest');
const express = require('express');
const adocaoRouter = require('../routes/adocaoRoutes'); // ajuste o caminho conforme a estrutura do seu projeto

const app = express();
app.use(express.json());
app.use('/api', adocaoRouter);

describe('Adocao API', () => {
  let users;
  let pets;
  let adocoes;

  beforeEach(() => {
    // Configuração inicial de dados antes de cada teste
    users = [
      { id: 1, name: 'John Doe', adoptedPets: [] },
      { id: 2, name: 'Jane Smith', adoptedPets: [] }
    ];

    pets = [
      { id: 1, name: 'Buddy', adotado: false },
      { id: 2, name: 'Charlie', adotado: false }
    ];

    adocoes = [];

    // Adiciona os dados de teste no app locals
    app.locals.users = users;
    app.locals.pets = pets;
    app.locals.adocoes = adocoes;
  });

  test('deve criar uma nova adoção', async () => {
    const response = await request(app)
      .post('/api/adocoes')
      .send({ id: 1, userId: 1, petId: 1 });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 1,
      tutor: 'John Doe',
      pet: { id: 1, name: 'Buddy', adotado: true }
    });
  });

  test('deve retornar erro ao tentar adotar um pet inexistente', async () => {
    const response = await request(app)
      .post('/api/adocoes')
      .send({ id: 1, userId: 1, petId: 999 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Pet não encontrado' });
  });

  test('deve listar todas as adoções', async () => {
    adocoes.push({
      id: 1,
      tutor: users[0],
      pet: { ...pets[0], adotado: true }
    });

    const response = await request(app).get('/api/adocoes');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        tutor: 'John Doe',
        pet: { id: 1, name: 'Buddy', adotado: true }
      }
    ]);
  });
});
