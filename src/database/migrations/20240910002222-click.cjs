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
      ipAddress:{
        type: Sequelize.STRING(46),
        allowNull: false,
      },
      userAgent:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Garante que o timestamp padrão é o momento da criação
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Atualiza o timestamp automaticamente quando a linha é atualizada
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clicks');
  }
};
