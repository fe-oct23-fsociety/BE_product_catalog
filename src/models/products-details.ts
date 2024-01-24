import { DataTypes } from 'sequelize';

export const productsDetails = {
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
};
