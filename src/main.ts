'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db.js';
import { productRoutes } from './routes/products.router.js';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

function createServer (): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/products', productRoutes);

  sequelize
    .authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');
    })
    .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
    });

  return app;
}

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
});
