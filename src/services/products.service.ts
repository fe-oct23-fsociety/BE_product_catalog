import { type Product, type ProductsWithCount } from '../types.js';
import { Products } from '../db.js';

import { Op, type WhereOptions } from 'sequelize';

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

const findById = async (id: number): Promise<Product | null> => {
  try {
    const searchedProduct = (await Products.findByPk(id)) as Product | null;

    return searchedProduct;
  } catch (err) {
    console.error('Error during the product fetch: ', err);
    throw err;
  }
};

export const productsService = {
  findAllProducts,
  findById
};
