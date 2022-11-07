'use strict';
const imagenes = [{ava:'usuario-v.jpg',usid:1},{ava:'usuario-v.jpg',usid:2}];

const avatars = imagenes.map(avatar => {
  return {
    avatar : avatar.ava,
    userId : avatar.usid,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
        
      await queryInterface.bulkInsert('Avatars',avatars,{});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Avatars', null, {});

  }
};
