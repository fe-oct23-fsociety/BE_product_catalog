import { Products } from '../db.js';
import { Op } from 'sequelize';

const findAllProducts = async (
  category: string | undefined,
  options: {
    limit?: number
    offset?: number
  } = {}
): Promise<any[]> => {
  const clauses: any = {};

  const { limit, offset } = options;

  if (typeof category === 'string') {
    clauses.category = category;
  } else if (Array.isArray(category)) {
    clauses.category = { [Op.in]: category };
  }

  const products = await Products.findAll({
    where: clauses,
    limit,
    offset
  });
  return products;
};

export const productsService = {
  findAllProducts
};
