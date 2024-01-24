import { type Request, type Response } from 'express';

import { productsService } from '../services/products.service.js';

export const isValidId = (id: any): boolean => {
  if (typeof id !== 'number') {
    return false;
  }

  if (Number.isNaN(id) || !isFinite(id) || id < 0) {
    return false;
  }

  return true;
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const { limit: limitParams, offset: offsetParams } = req.query;
  const category = req.query.category as string | undefined;

  const isLimitPassed = typeof limitParams === 'string';

  const limit = isLimitPassed ? Number(limitParams) : undefined;

  if (isLimitPassed && !isValidId(limit)) {
    res.status(400).send('Invalid limit');

    return;
  }

  const isOffsetPassed = typeof offsetParams === 'string';
  const offset = isOffsetPassed ? Number(offsetParams) : undefined;

  if (isOffsetPassed && !isValidId(offset)) {
    res.status(400).send('Invalid offset');

    return;
  }

  const options = { limit, offset };

  try {
    const products = await productsService.findAllProducts(category, options);

    if (products.length === 0) {
      res.sendStatus(404);
      return;
    }

    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const productsController = {
  getProducts
};
