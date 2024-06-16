const express = require('express');
const animaisController = require('../controllers/animaisController');

const router = express.Router();

router.post('/pets', animaisController.createPet);
router.get('/pets', animaisController.listAllPets);
router.get('/pets/available', animaisController.listAvailablePets);
router.get('/pets/:id', animaisController.getPetById);
router.put('/pets/:id', animaisController.updatePet);
router.delete('/pets/:id', animaisController.deletePet);

module.exports = router;
