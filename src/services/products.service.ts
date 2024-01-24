import { Products } from '../db.js';
import { Op } from 'sequelize';

const findAllProducts = async (category: any): Promise<any[]> => {
  const products = await Products.findAll({
    where: { [Op.in]: category }
  });

  return products;
};

export const productsService = {
  findAllProducts
};
