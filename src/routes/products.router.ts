/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { productsController } from '../controllers/products.controler.js';
import { productsDetailsController } from '../controllers/products-details.controler.js';

export const productRoutes = Router();

productRoutes.get('/', productsController.getProducts);
productRoutes.get('/discount', productsController.getDiscount);
productRoutes.get('/new', productsController.getNewest);
productRoutes.get('/:id/recommended', productsController.getRecommended);
productRoutes.get('/:id', productsDetailsController.getProductById);
