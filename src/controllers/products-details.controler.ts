import { type Request, type Response } from 'express';

import { productsDetailsService } from '../services/products-details.service.js';

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const productId = Number(id);
  if (isNaN(productId) || productId <= 0) {
    res.status(400).send('Invalid product ID');
    return;
  }

  try {
    const product = await productsDetailsService.findById(productId);

    if (product == null) {
      res.status(404).send('Product not found');

      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const productsDetailsController = {
  getProductById
};
