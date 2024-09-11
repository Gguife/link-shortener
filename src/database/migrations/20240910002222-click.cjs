'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clicks', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      urlId: {
        type: Sequelize.UUID,
        references: {
          model: 'urls',
          key: 'id'
        },
        allowNull: false
      },
      clickDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      ipAddress:{
        type: Sequelize.STRING(46),
        allowNull: false,
      },
      userAgent:{
        type: Sequelize.STRING(255),
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clicks');
  }
};
