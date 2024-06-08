const express = require('express');
const adocaoController = require('../controllers/adocaoController');

const router = express.Router();

router.post('/adocoes', adocaoController.createAdocao);
router.get('/adocoes', adocaoController.listAdocoes);

module.exports = router;
