const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const animaisRouter = require('../routes/animaisRoutes'); // Ajuste o caminho conforme necessário
const { Pets } = require('../Models'); // Certifique-se de que o modelo esteja no caminho correto

// Configurando o aplicativo Express
const app = express();
app.use(bodyParser.json());
app.use('/api', animaisRouter);

// Mock do modelo Pets
jest.mock('../Models');

describe('Pets API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new pet', async () => {
    const newPet = {
      animal: 'cachorro',
      raca: 'vira-lata',
      idade: 2,
      sexo: 'macho',
      descricao: 'Um cachorro amigável'
    };

    Pets.create.mockResolvedValue({ id: 1, ...newPet });

    const response = await request(app)
      .post('/api/pets')
      .send(newPet);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newPet);
  });

  it('should list all pets', async () => {
    const pets = [
      { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false },
      { id: 2, animal: 'gato', raca: 'siamês', idade: 3, sexo: 'fêmea', descricao: 'Um gato gracioso', adotado: false }
    ];

    Pets.findAll.mockResolvedValue(pets);

    const response = await request(app)
      .get('/api/pets');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(pets);
  });

  it('should list available pets', async () => {
    const availablePets = [
      { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false }
    ];

    Pets.findAll.mockResolvedValue(availablePets);

    const response = await request(app)
      .get('/api/pets/available');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(availablePets);
  });

  it('should get pet by id', async () => {
    const pet = { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false };

    Pets.findByPk.mockResolvedValue(pet);

    const response = await request(app)
      .get('/api/pets/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet);
  });

  it('deve atualizar um pet', async () => {
    const petOriginal = { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false };
    const updatedData = { idade: 3, descricao: 'Um cachorro muito amigável' };
    const petAtualizado = { ...petOriginal, ...updatedData };
  
    // Crie um mock para o método update
    const mockUpdate = jest.fn().mockResolvedValue(petAtualizado);
  
    // Simule a função findByPk para retornar um objeto com o método update simulado
    Pets.findByPk.mockResolvedValue({
      ...petOriginal,
      update: mockUpdate
    });
  
    // Simule a resposta do endpoint para retornar o objeto atualizado
    const response = await request(app)
      .put('/api/pets/1')
      .send(updatedData)
      .expect(200);
  
    // Verifique se a resposta do endpoint é o objeto atualizado
    expect(response.body).toEqual(petAtualizado);
  
    // Verifique se o método findByPk foi chamado com o ID correto
    expect(Pets.findByPk).toHaveBeenCalledWith(1);
  
    // Verifique se o método update foi chamado com os dados corretos
    expect(mockUpdate).toHaveBeenCalledWith(updatedData);
  });
  

  it('should delete a pet', async () => {
    const pet = { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false };

    Pets.findByPk.mockResolvedValue({
      ...pet,
      destroy: jest.fn().mockResolvedValue(true)
    });

    const response = await request(app)
      .delete('/api/pets/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Pet deletado com sucesso!' });
  });
});
