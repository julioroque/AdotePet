const request = require('supertest');
const express = require('express');
const userRouter = require('../routes/userRoutes');
const UserService = require('../services/userService');

jest.mock('../services/userService'); // Mock the UserService

const app = express();
app.use(express.json());
app.use('/', userRouter);

describe('UserController', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { id: 1, name: 'John Doe' };
      UserService.create.mockResolvedValue(newUser);

      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
    });

    it('should return 500 on internal server error', async () => {
      UserService.create.mockRejectedValue(new Error('Erro ao criar usuário'));

      const response = await request(app)
        .post('/users')
        .send({ name: 'Jane Doe' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Erro ao criar usuário',
        error: 'Erro ao criar usuário'
      });
    });
  });

  describe('GET /users', () => {
    it('should list all users', async () => {
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ];
      UserService.listAllUsers.mockResolvedValue(users);

      const response = await request(app)
        .get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(users);
    });

    it('should return 500 on internal server error', async () => {
      UserService.listAllUsers.mockRejectedValue(new Error('Erro ao listar usuários'));

      const response = await request(app)
        .get('/users');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erro ao listar usuários' });
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by ID', async () => {
      const user = { id: 1, name: 'John Doe' };
      UserService.findById.mockResolvedValue(user);

      const response = await request(app)
        .get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it('should return 404 if user is not found', async () => {
      UserService.findById.mockResolvedValue(null);

      const response = await request(app)
        .get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Usuário não encontrado' });
    });

    it('should return 500 on internal server error', async () => {
      UserService.findById.mockRejectedValue(new Error('Erro ao buscar usuário'));

      const response = await request(app)
        .get('/users/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erro ao buscar usuário' });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      UserService.delete.mockResolvedValue(true);

      const response = await request(app)
        .delete('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Usuário deletado com sucesso!' });
    });

    it('should return 404 if user is not found', async () => {
      UserService.delete.mockResolvedValue(false);

      const response = await request(app)
        .delete('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Usuário não encontrado' });
    });

    it('should return 500 on internal server error', async () => {
      UserService.delete.mockRejectedValue(new Error('Erro ao deletar usuário'));

      const response = await request(app)
        .delete('/users/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erro ao deletar usuário' });
    });
  });
});
