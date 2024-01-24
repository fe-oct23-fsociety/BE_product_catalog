'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { sequelize } from './db.js';
import { productRoutes } from './routes/products.router.js';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT ?? 3001;

function createServer (): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);

  const truePath = path.join(_dirname, '../public');

  app.use('/static', (req, res, next) => {
    if (req.path.endsWith('.webp')) {
      req.url = req.url.replace('.webp', '.jpg');
    }
    next();
  });

  app.use('/static', express.static(truePath));

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
