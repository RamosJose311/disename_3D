'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      rol: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      dateBirth: {
        type: Sequelize.DATE,
        allowNull:true
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      province: {
        type: Sequelize.STRING,
        allowNull:false
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT
      },
      genderId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Genders'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },

      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};