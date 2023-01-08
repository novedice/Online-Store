import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export function takeDataFromStorage() {
  const {
    addToCart,
    productsInCart,
    addOne,
    addRsDisc,
    addEpmDisc,
    listOfProd,
  } = useContext(CartContext);

  if (localStorage.getItem('listOfProd') !== null) {
    const list = JSON.parse(localStorage.getItem('listOfProd'));
    const products = JSON.parse(localStorage.getItem('productsInCart'));
    console.log('prod in ls', products);
    const rs = JSON.parse(localStorage.getItem('rsDiscount'));
    const epm = JSON.parse(localStorage.getItem('epmDiscount'));
    for (let i = 0; i < list.length; i += 1) {
      console.log('i', i);
      console.log('list', list[i]);
      addToCart(list[i]);
      console.log('listofprod', listOfProd);
      console.log('prodincart', productsInCart);
      console.log(`products${i}`, products[i]);
      if (products[i].quantity !== 1) {
        while (productsInCart[i].quantity !== products[i].quantity) {
          addOne(products[i]);
        }
      }
    }
    if (rs) {
      addRsDisc();
    }
    if (epm) {
      addEpmDisc();
    }
  }
}
