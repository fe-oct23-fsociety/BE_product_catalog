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

    res.send({ count, products });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountProducts = await productsService.getDiscountProduct();
    if (discountProducts.length > 0) {
      res.status(200).send(discountProducts);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

const getrecommended = async (req: Request, res: Response): Promise<void> => {
  try {
    const recommendedProducts = await productsService.getrecommendedProducts();

    if (recommendedProducts.length > 0) {
      res.status(200).send(recommendedProducts);
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const productsController = {
  getProducts,
  getDiscount,
  getrecommended
};
