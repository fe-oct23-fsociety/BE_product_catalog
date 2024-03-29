'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products-details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },

      namespaceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      capacityAvailable: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },

      capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      priceRegular: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },

      priceDiscount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },

      colorsAvailable: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },

      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },

      description: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      screen: {
        type: Sequelize.STRING,
      },

      resolution: {
        type: Sequelize.STRING,
      },

      processor: {
        type: Sequelize.STRING,
      },

      ram: {
        type: Sequelize.STRING,
      },

      camera: {
        type: Sequelize.STRING,
      },

      zoom: {
        type: Sequelize.STRING,
      },

      cell: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Products-details');
  },
};
