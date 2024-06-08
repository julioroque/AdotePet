const request = require('supertest');
const app = require('../../app');

describe('API Tests - Users', () => {
  let userId;

  test('Criar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe'
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    userId = response.body.id;
  });

  test('Listar todos os usuários', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Obter um usuário específico', async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe('John Doe');
  });

  test('Deletar um usuário', async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuário deletado com sucesso!');
  });

  test('Deletar um usuário inexistente deve falhar', async () => {
    const response = await request(app).delete(`/users/99999`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Usuário não encontrado');
  });
});
