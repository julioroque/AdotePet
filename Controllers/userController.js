const User = require('../Models/User');

let users = [];

const userController = {
  createUser: (req, res) => {
    const newUser = User.create(users, req.body);
    res.status(201).json(newUser);
  },

  listAllUsers: (req, res) => {
    res.status(200).json(User.listAllUsers(users));
  },

  deleteUser: (req, res) => {
    if (User.delete(users, req.params.id)) {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  }
};

module.exports = userController;
