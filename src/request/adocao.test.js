const request = require('supertest');
const app = require('../../app');

describe('API Tests - Adocao', () => {
  let adocaoId;
  let userId;
  let petId;

  beforeAll(async () => {
    // Criar um usuário e um pet para a adoção
    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Jane Doe'
      });
    userId = userResponse.body.id;

    const petResponse = await request(app)
      .post('/pets')
      .send({
        animal: 'Gato',
        raca: 'Siamês',
        idade: 1,
        sexo: 'F',
        descricao: 'Um gato tranquilo'
      });
    petId = petResponse.body.id;
  });

  test('Realizar uma adoção', async () => {
    const response = await request(app)
      .post('/adocoes')
      .send({
        id: 1, // ou você pode gerar um ID único de alguma forma
        userId: userId,
        petId: petId
      });

    expect(response.status).toBe(201);
    expect(response.body.pet.id).toBe(petId);
    adocaoId = response.body.id;
  });

  test('Tentar adotar um pet já adotado deve falhar', async () => {
    const response = await request(app)
      .post('/adocoes')
      .send({
        id: 2,
        userId: userId,
        petId: petId
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Este pet já foi adotado!');
  });

  test('Listar todas as adoções', async () => {
    const response = await request(app).get('/adocoes');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
