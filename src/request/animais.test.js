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

  it('criar novo pet', async () => {
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

  it('listar todos os pets', async () => {
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

  it('listar pets disponiveis', async () => {
    const availablePets = [
      { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false }
    ];

    Pets.findAll.mockResolvedValue(availablePets);

    const response = await request(app)
      .get('/api/pets/available');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(availablePets);
  });

  it('lsitar pet por id', async () => {
    const pet = { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false };

    Pets.findByPk.mockResolvedValue(pet);

    const response = await request(app)
      .get('/api/pets/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet);
  });

  it('deve atualizar um pet', async () => {
    const pet = { id: 1, animal: 'cachorro', raca: 'vira-lata', idade: 2, sexo: 'macho', descricao: 'Um cachorro amigável', adotado: false };
    const updatedData = { idade: 3, descricao: 'Um cachorro muito amigável' };
  
    // Aqui garantimos que o método update realmente atualiza o objeto
    Pets.findByPk.mockResolvedValue({
      ...pet,
      update: jest.fn().mockImplementation((data) => {
        return { ...pet, ...data };
      })
    });
  
    const response = await request(app)
      .put('/api/pets/1')
      .send(updatedData);
  
    expect(response.status).toBe(200);
  });

  it('deletar um pet', async () => {
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
