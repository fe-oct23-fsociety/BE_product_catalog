import { type Request, type Response } from 'express';

import { productsService } from '../services/products.service.js';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const category = req.query.category as string | undefined;

  const products = await productsService.findAllProducts(category);

  if (products.length === 0) {
    res.sendStatus(404);

    return;
  }

  res.send(products);
};

export const productsController = {
  getProducts
};
