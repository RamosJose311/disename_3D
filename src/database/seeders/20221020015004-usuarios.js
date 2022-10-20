'use strict';
const usuarios =require('../../data/usuarioSequelize.json')

const users = usuarios.map(({firstname,lastname,email,password,rol,dateBirth,address,city,province,country,description,genderId}) => {
  return {
    firstname,
    lastname,
    email,
    password,
    rol,
    dateBirth,
    address,
    city,
    province,
    country,
    description,
    genderId,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Users',users,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
