'use strict';

import products from './20240123124453-add-products.json';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Products',
      products,
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
