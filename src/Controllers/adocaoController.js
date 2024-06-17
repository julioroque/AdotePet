const AdocaoService = require('../services/adocaoService');
const UserService = require('../services/userService');
const petsService = require('../services/petsService');

exports.createAdocao = async (req, res) => {
  try {
    const { userId, petId } = req.body; 
    const adocao = await AdocaoService.adotarPet(userId, petId); 
    res.status(201).json(adocao);
  } catch (error) {
    
    if(error.message === 'Usuário não encontrado'){
      res.status(404).json({ message: error.message });
    } else{
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

exports.listAdocoes = async (req, res) => {
  try {
    const { type } = req.query; // Pegue o tipo de animal dos parâmetros de consulta
    const adocoes = await AdocaoService.listAdocoes(type); // Passe o tipo para o método do serviço
    res.json(adocoes);
  } catch (error) {
    
    res.status(500).json({ message: 'Erro interno do servidor' });
  }


};