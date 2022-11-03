'use strict';
const categorias = ['Mates','Figuras','Llaveros','Articulados','Portacelular','Cosplay','Juegos','Funkos'];

const categories = categorias.map(category => {
  return {
    name : category,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Categories',categories,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
