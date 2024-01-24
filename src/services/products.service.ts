import { Products } from '../db.js';
import { Op } from 'sequelize';

const findAllProducts = async (
  category: string | undefined
): Promise<any[]> => {
  const clauses: any = {};

  if (typeof category === 'string') {
    clauses.category = category;
  } else if (Array.isArray(category)) {
    clauses.category = { [Op.in]: category };
  }

  const products = await Products.findAll({
    where: clauses
  });
  return products;
};

export const productsService = {
  findAllProducts
};
