'use strict';

const products = require('./20240123124453-add-products.json');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
