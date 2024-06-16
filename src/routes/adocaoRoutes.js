const express = require('express');
const adocaoController = require('../Controllers/adocaoController');

const router = express.Router();

// Rota para criar uma adoção
router.post('/adocoes', adocaoController.createAdocao);

// Rota para listar todas as adoções
router.get('/adocoes', adocaoController.listAdocoes);

module.exports = router;
