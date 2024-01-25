import { DataTypes } from 'sequelize';

export const products = {
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
};
