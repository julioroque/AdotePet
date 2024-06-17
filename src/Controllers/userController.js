const UserService = require('../services/userService');

let users = []; // Aqui você pode usar uma fonte de dados real

exports.createUser = async (req, res) => {
  try {
    const newUser = await UserService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
     // Adiciona um log mais detalhado aqui
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await UserService.listAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.findById(parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const success = await UserService.delete(parseInt(req.params.id));
    if (success) {
      res.json({ message: 'Usuário deletado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

module.exports = exports;