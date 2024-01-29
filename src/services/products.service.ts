import { type Product, type ProductsWithCount } from '../types.js';
import { Products } from '../db.js';

import { Op, Sequelize, type WhereOptions } from 'sequelize';

const findAllProducts = async (
  category: string | string[] | undefined,
  options: {
    limit?: number
    offset?: number
  } = {}
): Promise<ProductsWithCount> => {
  const whereOptions: WhereOptions = {};

  const { limit, offset } = options;

  if (typeof category === 'string') {
    whereOptions.category = category;
  } else if (Array.isArray(category)) {
    whereOptions.category = { [Op.in]: category };
  }

  const products = await Products.findAndCountAll({
    where: whereOptions,
    limit,
    offset
  });

  // if (products.count === 0) {
  //   return {}
  // }

  return {
    count: products.count,
    rows: products.rows
  };
};

const getDiscountProduct = async (): Promise<Product[]> => {
  const productWithDiscount = await Products.findAll({
    order: Sequelize.literal('("fullPrice" - "price") DESC'),
    limit: 5
  });

  const productDiscount = productWithDiscount.map((product) =>
    product.get({ plain: true })
  );

  return productDiscount;
}

const getrecommendedProducts = async (): Promise<Product[]> => {
  const recommendedProducts = await Products.findAll({
    where: {
      category: 'phones'
    },
    order: Sequelize.literal('random()'),
    limit: 5
  });

  const plainProducts = recommendedProducts.map((product) =>
    product.get({ plain: true })
  );

  return plainProducts;
};

export const productsService = {
  findAllProducts,
  getDiscountProduct,
  getrecommendedProducts
};
