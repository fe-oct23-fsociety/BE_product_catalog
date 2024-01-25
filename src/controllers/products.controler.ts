import { type Request, type Response } from 'express';

import { productsService } from '../services/products.service.js';
import { isValid } from '../utils/isValid.js';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const { limit: limitParams, offset: offsetParams } = req.query;

  const category = req.query.category as string | undefined;

  const isLimitPassed = typeof limitParams === 'string';

  const limit = isLimitPassed ? Number(limitParams) : undefined;

  if (isLimitPassed && !isValid(limit)) {
    res.status(400).send('Invalid limit');

    return;
  }

  const isOffsetPassed = typeof offsetParams === 'string';
  const offset = isOffsetPassed ? Number(offsetParams) : undefined;

  if (isOffsetPassed && !isValid(offset)) {
    res.status(400).send('Invalid offset');

    return;
  }

  const options = { limit, offset };

  try {
    const { count, rows: products } = await productsService.findAllProducts(
      category,
      options
    );

    if (products.length === 0) {
      res.sendStatus(404);
      return;
    }

    res.send({ count, products });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const productId = Number(id);
  if (isNaN(productId) || productId <= 0) {
    res.status(400).send('Invalid product ID');
    return;
  }

  try {
    const product = await productsService.findById(productId);

    if (product == null) {
      res.status(404).send('Product not found');

      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const productsController = {
  getProducts,
  getProductById
};
