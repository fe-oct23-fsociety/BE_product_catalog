'use strict';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
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
            rejectUnauthorized: false,
        },
    },
});
