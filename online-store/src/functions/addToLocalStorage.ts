import { useContext, useEffect } from 'react';
import { CartContext } from '../Context/CartContext';

export function addToLocalStorage() {
  const { listOfProd, productsInCart, epmDiscount, rsDiscount } =
    useContext(CartContext);

  useEffect(() => {
    localStorage.setItem('listOfProd', JSON.stringify(listOfProd));
  }, [listOfProd]);

  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    localStorage.setItem('epmDiscount', JSON.stringify(epmDiscount));
  }, [listOfProd]);

  useEffect(() => {
    localStorage.setItem('rsDiscount', JSON.stringify(rsDiscount));
  }, [rsDiscount]);
}
