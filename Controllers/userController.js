const User = require('../models/User');

let users = []; // Aqui você pode usar uma fonte de dados real

exports.createUser = (req, res) => {
  const newUser = User.create(users, req.body);
  res.status(201).json(newUser);
};

exports.listAllUsers = (req, res) => {
  res.json(User.listAllUsers(users));
};

exports.getUserById = (req, res) => {
  const user = User.findById(users, parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

exports.deleteUser = (req, res) => {
  const success = User.delete(users, parseInt(req.params.id));
  if (success) {
    res.json({ message: 'Usuário deletado com sucesso!' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};
module.exports = exports;