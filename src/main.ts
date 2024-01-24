'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db.js';
import { productRoutes } from './routes/products.router.js';
import { createImagesServer } from './static_server/static-server.js';

dotenv.config();

const PORT = process.env.PORT ?? 3001;
const IMAGES_PORT = process.env.IMG_PORT ?? 3002;

createImagesServer(Number(IMAGES_PORT));

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
