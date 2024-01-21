'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { sequelize } from './db.js';
dotenv.config();

// const { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASS } = process.env;

const PORT = process.env.PORT ?? 3001;

function createServer (): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  sequelize
    .authenticate()
    .then(() => {
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
