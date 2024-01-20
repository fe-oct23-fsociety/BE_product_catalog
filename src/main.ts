'use strict';

import express, { Express } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { sequelize } from './db.js';
dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASS } = process.env;

const PORT = process.env.PORT || 3001;

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  console.log(DB_HOST);
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });

  return app;
}

createServer().listen(PORT, () => {
  console.log(`Server is listening PORT ${PORT}`);
});
