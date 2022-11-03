'use strict';
const generos = ['Masculino', 'Femeninos','Otros'];

const genders = generos.map(gender => {
  return {
    name : gender,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Genders',genders,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genders', null, {});

  }
};
