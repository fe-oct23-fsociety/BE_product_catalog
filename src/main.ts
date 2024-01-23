'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Products, sequelize } from './db.js';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

async function getAllProducts(): Promise<any[]> {
  const products = await Products.findAll();
  if (products.length === 0) {
    console.log(1);
  }
  console.log(products.every((product) => product instanceof Products)); // true
  console.log('All products:', JSON.stringify(products, null, 2));
  return products;
}

function createServer(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  sequelize
    .authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');
      await getAllProducts();
    })
    .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
    });

  return app;
}

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
});
