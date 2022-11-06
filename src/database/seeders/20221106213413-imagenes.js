'use strict';
const imagenes =require('../../data/imagesSequelize.json')

const images = imagenes.map(({file,productsId}) => {
  return {
    file,
    productsId,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Images',images,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});

  }
};
