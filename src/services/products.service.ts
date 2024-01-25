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

  return {
    count: products.count,
    rows: products.rows
  };
};

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
  getrecommendedProducts
};
