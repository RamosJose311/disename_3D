'use strict';
const productos =require('../../data/productsSequelize.json')

const products = productos.map(({name,price,discount,height,time,categoryId,materialId,description,view}) => {
  return {
    name,
    price,
    discount,
    height,
    time,
    categoryId,
    materialId,
    description,
    view,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Products',products,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
