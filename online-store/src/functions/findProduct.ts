import { allProducts } from '../hooks/products';
import { IProduct } from '../types/types';

export function findProd(id: string): IProduct {
  let i = 0;
  while (allProducts[i].id !== parseInt(id)) {
    i += 1;
  }
  return allProducts[i];
}
