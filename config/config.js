'use strict';

const dotenv = require('dotenv');
dotenv.config();

const { DB_URL } = process.env;

if (typeof DB_URL !== 'string') {
  console.log('Something bad with env variables!');
  process.exit(1);
}

const settings = {
  seederStorage: 'sequelize',
  url: DB_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const config = {
  development: { ...settings },
  test: { ...settings },
  production: { ...settings }
};

module.exports = config;