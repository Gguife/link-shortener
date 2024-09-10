'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('url', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      originalUrl: {
        type: Sequelize.STRING(2048),
        allowNull: false,
        validate: {
          isUrl: true,
        }
      },
      shortUrl:{
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('url');
  }
};
