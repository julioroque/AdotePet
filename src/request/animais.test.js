const request = require('supertest');
const app = require('../../app');

describe('API Tests - Pets', () => {
  let petId;

  test('Criar um novo pet', async () => {
    const response = await request(app)
      .post('/pets')
      .send({
        animal: 'Cachorro',
        raca: 'Labrador',
        idade: 2,
        sexo: 'M',
        descricao: 'Um cachorro amigável'
      });

    expect(response.status).toBe(201);
    expect(response.body.animal).toBe('Cachorro');
    petId = response.body.id;
  });

  test('Listar todos os pets', async () => {
    const response = await request(app).get('/pets');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Listar pets disponíveis para adoção', async () => {
    const response = await request(app).get('/pets/available');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Obter um pet específico', async () => {
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(petId);
    expect(response.body.animal).toBe('Cachorro');
  });

  test('Atualizar um pet', async () => {
    const response = await request(app)
      .put(`/pets/${petId}`)
      .send({
        descricao: 'Um cachorro muito amigável'
      });

    expect(response.status).toBe(200);
    expect(response.body.descricao).toBe('Um cachorro muito amigável');
  });

  test('Deletar um pet', async () => {
    const response = await request(app).delete(`/pets/${petId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Pet deletado com sucesso!');
  });

  test('Deletar um pet inexistente deve falhar', async () => {
    const response = await request(app).delete(`/pets/99999`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Pet não encontrado');
  });
});
