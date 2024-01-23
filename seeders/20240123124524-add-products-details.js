'use strict';

const products_details = require('./20240123124524-add-products-details.json');

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Products-details',
      products_details,
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products-details', null, {});
  }
};
