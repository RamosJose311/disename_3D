'use strict';
const materiales = ['PLA'];

const materials = materiales.map(material => {
  return {
    name : material,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Materials',materials,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materials', null, {});

  }
};
