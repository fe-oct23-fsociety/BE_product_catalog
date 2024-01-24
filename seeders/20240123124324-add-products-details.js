'use strict';

const products_details = require('./20240123124324-add-products-details.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products-details',
      products_details,
      {},
      { description: { type: new Sequelize.JSON() } },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products-details', null, {});
  },
};
