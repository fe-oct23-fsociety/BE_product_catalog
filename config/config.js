'use strict';

import dotenv from 'dotenv';
dotenv.config();

const { DB_URL } = process.env;

if (typeof DB_URL !== 'string') {
  console.log('Something bad with env variables!');
  process.exit(1);
}

const settings = {
  seederStorage: 'sequelize',
  url: DB_URL,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

module.exports = {
  development: { ...settings },
  test: { ...settings },
  production: { ...settings }
};
