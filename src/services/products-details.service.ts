import { Products, ProductsDetails } from '../db.js';
import { type Product, type ProductDetails } from '../types.js';

const findById = async (id: number): Promise<ProductDetails | null> => {
  try {
    const searchedProduct = (await Products.findByPk(id)) as Product | null;

    if (searchedProduct !== null) {
      const itemId = searchedProduct.itemId;

      const searchedDetailedProduct = (await ProductsDetails.findByPk(
        itemId
      )) as ProductDetails | null;

      return searchedDetailedProduct;
    }

    return null;
  } catch (err) {
    console.error('Error during the product fetch: ', err);
    return null;
  }
};

export const productsDetailsService = {
  findById
};
