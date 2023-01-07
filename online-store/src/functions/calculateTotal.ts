import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { allProducts } from '../hooks/products';

export function calculateTotal() {
  const { listOfProd, productsInCart } = useContext(CartContext);

  if (listOfProd.length === 0) {
    return 0;
  } else {
    return allProducts
      .filter((product) => listOfProd.includes(product.id))
      .reduce(
        (acc, curVal) =>
          acc +
          curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity,
        0
      )
      .toFixed(2);
  }
}
