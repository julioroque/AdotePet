const { User, Pets, Adocao } = require('../Models');
const { sequelize } = require('../Models');

class AdocaoService {
  static async adotarPet(userId, petId) {
    const t = await sequelize.transaction(); // Iniciar uma nova transação
    try {
      const tutor = await User.findByPk(userId, { transaction: t });
      const pet = await Pets.findByPk(petId, { transaction: t });

      if (!tutor) {
        await t.rollback(); // Reverte a transação se o tutor não for encontrado
        throw new Error('Usuário não encontrado');
      }

      if (!pet.adotado) {
        const adocao = await Adocao.create(
          { tutorId: tutor.id, petId: pet.id },
          { transaction: t }
        );
        
        // Recarrega o objeto adocao com as associações após a criação
        await adocao.reload({ 
          include: [
            { model: User, as: 'tutor' },
            { model: Pets, as: 'pet' }
          ],
          transaction: t
        });

        await pet.update({ adotado: true }, { transaction: t });
        await t.commit(); // Se tudo estiver correto, confirma a transação
        
        // Retorna uma mensagem de sucesso após a adoção ser confirmada
        return `O pet ${pet.id} foi adotado com sucesso por ${tutor.name}!`;
      } else {
        await t.rollback(); // Reverte a transação se o pet já estiver adotado
        return 'Este pet já foi adotado!';
      }
    } catch (error) {
      if (t.finished !== 'commit') {
        await t.rollback(); // Se houver erro, reverte todas as operações da transação
      }
      console.error('Erro ao adotar pet:', error);
      throw error;
    }
  }
  
  static async listAdocoes(type, tutorId) {
  const petCondition = type ? { animal: type.toLowerCase() } : {};
  const tutorCondition = tutorId ? { tutorId: tutorId } : {}; // Crie uma condição baseada no ID do tutor
  const adocoes = await Adocao.findAll({
    where: tutorCondition, // Aplique a condição do tutor ao modelo de adoção
    include: [
      { model: User, as: 'tutor', where: tutorCondition }, // Aplique a condição ao modelo de usuário incluído se necessário
      { model: Pets, as: 'pet', where: petCondition }
    ]
  });
  return adocoes.map(adocao => AdocaoService.renderAdocao(adocao));
}

  static renderAdocao(adocao) {
    if (!adocao || !adocao.tutor || !adocao.pet) {
      throw new Error('Objeto de adoção inválido');
    }
  
    return {
      id: adocao.id,
      tutor: adocao.tutor.name, // Certifique-se de que adocao.tutor é um objeto válido com a propriedade 'name'
      pet: {
        id: adocao.pet.id,
        name: adocao.pet.name, // Certifique-se de que adocao.pet é um objeto válido com a propriedade 'name'
        adotado: adocao.pet.adotado
      }
    };
  }
}

module.exports = AdocaoService;
