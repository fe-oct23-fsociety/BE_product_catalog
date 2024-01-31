import { type Request, type Response } from 'express';

import { productsService } from '../services/products.service.js';
import { isValid } from '../utils/isValid.js';
import { isParamsPassed } from '../utils/isParamsPassed.js';
import { isString } from '../utils/isString.js';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const {
    limit: limitParams,
    offset: offsetParams,
    search: searchParams
  } = req.query;

  const category = req.query.category as string | undefined;

  const isLimitPassed = typeof limitParams === 'string';

  const limit = isLimitPassed ? Number(limitParams) : undefined;

  const search = searchParams as string | undefined;

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

  const options = { limit, offset, search };

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
  const { limit: limitParams, offset: offsetParams } = req.query;

  const limit = isParamsPassed(limitParams);

  if (isString(limitParams) && !isValid(limit)) {
    res.status(400).send('Invalid limit');

    return;
  }

  const offset = isParamsPassed(offsetParams);

  if (isString(offsetParams) && !isValid(offset)) {
    res.status(400).send('Invalid offset');

    return;
  }

  try {
    const discountProducts = await productsService.getDiscountProduct(
      limit,
      offset
    );
    if (discountProducts.length > 0) {
      res.status(200).send(discountProducts);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getRecommended = async (req: Request, res: Response): Promise<void> => {
  try {
    const recommendedProducts = await productsService.getRecommendedProducts();

    if (recommendedProducts.length > 0) {
      res.status(200).send(recommendedProducts);
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

const getNewest = async (req: Request, res: Response): Promise<void> => {
  try {
    const newestProducts = await productsService.getNewestProducts();

    if (newestProducts.length > 0) {
      res.status(200).send(newestProducts);
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

export const productsController = {
  getProducts,
  getDiscount,
  getRecommended,
  getNewest
};
