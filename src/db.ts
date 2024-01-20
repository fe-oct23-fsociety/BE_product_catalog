'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error('Something bad with env variables!');
}

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
