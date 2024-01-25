'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { products } from './models/products.js';
import { productsDetails } from './models/products-details.js';
dotenv.config();

const { DB_URL } = process.env;

if (typeof DB_URL !== 'string') {
  console.log('Something bad with env variables!');
  process.exit(1);
}

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export const Products = sequelize.define('Products', products, {
  tableName: 'Products',
  createdAt: false,
  updatedAt: false
});
export const ProductsDetails = sequelize.define(
  'Products-details',
  productsDetails,
  {
    tableName: 'Products-details',
    createdAt: false,
    updatedAt: false
  }
);
