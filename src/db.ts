'use strict';

import dotenv from 'dotenv';
import { DataTypes, Sequelize } from 'sequelize';
dotenv.config();

const { DB_URL } = process.env;

if (typeof DB_URL !== 'string') {
  console.log('Something bad with env variables!');
  process.exit(1);
}

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export const Products = sequelize.define(
  'Products',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL
    },
    screen: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ram: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'Products',
    createdAt: false,
    updatedAt: false
  }
);
export const ProductsDetails = sequelize.define(
  'Products_details',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING
    },

    namespaceId: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capacityAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },

    capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },

    priceRegular: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    priceDiscount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    colorsAvailable: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false
    },

    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },

    description: {
      type: DataTypes.JSONB
    },

    screen: {
      type: DataTypes.STRING
    },

    resolution: {
      type: DataTypes.STRING
    },

    processor: {
      type: DataTypes.STRING
    },

    ram: {
      type: DataTypes.STRING
    },

    camera: {
      type: DataTypes.STRING
    },

    zoom: {
      type: DataTypes.STRING
    },

    cell: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
  {
    tableName: 'Products_details',
    createdAt: false,
    updatedAt: false
  }
);
