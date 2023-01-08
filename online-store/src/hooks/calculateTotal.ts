import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { allProducts } from '../hooks/products';

export function useTotal() {
  const { listOfProd, productsInCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);

  const { rsDiscount, epmDiscount } = useContext(CartContext);
  const coefficient = rsDiscount
    ? epmDiscount
      ? 0.8
      : 0.9
    : epmDiscount
    ? 0.9
    : 1;

  function findTotal() {
    console.log('list:', listOfProd);
    if (listOfProd.length !== 0) {
      setTotal(
        allProducts
          .filter((product) => listOfProd.includes(product.id))
          .reduce(
            (acc, curVal) =>
              acc +
              curVal.price *
                productsInCart[listOfProd.indexOf(curVal.id)].quantity,
            0
          )
      );
    }
    setTotalWithDiscount(total * coefficient);
  }

  useEffect(() => {
    findTotal();
  }, [productsInCart]);
  return { total, totalWithDiscount };
}
