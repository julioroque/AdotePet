const request = require('supertest');
const express = require('express');
const adocaoRouter = require('../routes/adocaoRoutes');
const AdocaoService = require('../services/adocaoService'); 

jest.mock('../services/adocaoService'); // Mock the AdocaoService

const app = express();
app.use(express.json());
app.use('/', adocaoRouter);

describe('AdocaoController', () => {
  describe('POST /adocoes', () => {
    it('should create a new adoption', async () => {
      const adocaoData = { userId: 1, petId: 1 };
      const newAdocao = { id: 1, ...adocaoData };

      AdocaoService.adotarPet.mockResolvedValue(newAdocao);

      const response = await request(app)
        .post('/adocoes')
        .send(adocaoData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newAdocao);
    });

    it('should return 404 if user is not found', async () => {
      AdocaoService.adotarPet.mockRejectedValue(new Error('Usuário não encontrado'));

      const response = await request(app)
        .post('/adocoes')
        .send({ userId: 999, petId: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Usuário não encontrado' });
    });

    it('should return 500 on internal server error', async () => {
      AdocaoService.adotarPet.mockRejectedValue(new Error('Erro interno do servidor'));

      const response = await request(app)
        .post('/adocoes')
        .send({ userId: 1, petId: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erro interno do servidor' });
    });
  });

  describe('GET /adocoes', () => {
    it('should list all adoptions', async () => {
      const adocoes = [
        { id: 1, userId: 1, petId: 1 },
        { id: 2, userId: 2, petId: 2 }
      ];

      AdocaoService.listAdocoes.mockResolvedValue(adocoes);

      const response = await request(app)
        .get('/adocoes');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(adocoes);
    });

    it('should list adoptions of a specific type', async () => {
      const adocoes = [
        { id: 1, userId: 1, petId: 1, type: 'dog' },
        { id: 2, userId: 2, petId: 2, type: 'dog' }
      ];

      AdocaoService.listAdocoes.mockResolvedValue(adocoes);

      const response = await request(app)
        .get('/adocoes')
        .query({ type: 'dog' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(adocoes);
    });

    it('should return 500 on internal server error', async () => {
      AdocaoService.listAdocoes.mockRejectedValue(new Error('Erro interno do servidor'));

      const response = await request(app)
        .get('/adocoes');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erro interno do servidor' });
    });
  });
});
