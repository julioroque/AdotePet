const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.listAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
