import { type Product, type ProductsWithCount } from '../types.js';
import { Products } from '../db.js';

import {
  Op,
  Sequelize,
  type FindAndCountOptions,
  type WhereOptions
} from 'sequelize';

const findAllProducts = async (
  category: string | string[] | undefined,
  options: {
    limit?: number
    sortBy?: string
    sortType?: string
    offset?: number
    search?: string
  } = {}
): Promise<ProductsWithCount> => {
  const whereOptions: WhereOptions = {};
  const { limit, offset, search, sortBy, sortType } = options;

  if (typeof category === 'string') {
    whereOptions.category = category;
  } else if (Array.isArray(category)) {
    whereOptions.category = { [Op.in]: category };
  }

  if (typeof search === 'string' && search.trim() !== '') {
    whereOptions.name = { [Op.like]: `%${search}%` };
  }

  const findOptions: FindAndCountOptions = {
    where: whereOptions,
    limit,
    offset,
    order:
      sortBy != null && sortType != null
        ? Sequelize.literal(`${sortBy} ${sortType}`)
        : undefined
  };

  const products = await Products.findAndCountAll(findOptions);

  return {
    count: products.count,
    rows: products.rows
  };
};

const getDiscountProduct = async (
  limit?: number,
  offset?: number
): Promise<Product[]> => {
  const productWithDiscount = await Products.findAll({
    order: Sequelize.literal('("fullPrice" - "price") DESC'),
    limit,
    offset
  });

  const productDiscount = productWithDiscount.map((product) =>
    product.get({ plain: true })
  );

  return productDiscount;
};

const getNewestProducts = async (
  limit?: number,
  offset?: number
): Promise<Product[]> => {
  const newestProducts = await Products.findAll({
    order: Sequelize.literal('("year") DESC'),
    limit,
    offset
  });

  const newProducts = newestProducts.map((product) =>
    product.get({ plain: true })
  );

  return newProducts;
};

const getRecommendedProducts = async (): Promise<Product[]> => {
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
  getRecommendedProducts,
  getNewestProducts
};
