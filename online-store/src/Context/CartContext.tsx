/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from 'react';
import { ICartContext, IProdInCart } from '../types/types';

export const CartContext = createContext<ICartContext>({
  listOfProd: [],
  rsDiscount: false,
  epmDiscount: false,
  productsInCart: [],
  addOne: (product: IProdInCart) => {},
  minusOne: (product: IProdInCart) => {},
  addToCart: (id: number) => {},
  delFromCart: (id: number) => {},
  addRsDisc: () => {},
  addEpmDisc: () => {},
  removeRsDisc: () => {},
  removeEpmDisc: () => {},
  clearCart: () => {},
  resorteCart: () => {},
});

export const CartState = ({ children }: { children: React.ReactNode }) => {
  const [rsDiscount, setRsDiscount] = useState(false);
  const [epmDiscount, setEpmDiscount] = useState(false);
  const [productsInCart, setProductsInCart] = useState<IProdInCart[]>([]);
  const [listOfProd, setListOfProd] = useState<number[]>([]);

  const addRsDisc = () => {
    setRsDiscount(true);
    localStorage.setItem('rsDiscount', JSON.stringify(true));
  };
  const addEpmDisc = () => {
    setEpmDiscount(true);
    localStorage.setItem('epmDiscount', JSON.stringify(true));
  };
  const removeRsDisc = () => {
    setRsDiscount(false);
    localStorage.setItem('rsDiscount', JSON.stringify(false));
  };
  const removeEpmDisc = () => {
    setEpmDiscount(false);
    localStorage.setItem('epmDiscount', JSON.stringify(false));
  };

  const [quantity, setQuantity] = useState<number>(1);

  const addOne = (product: IProdInCart) => {
    setQuantity((productsInCart[listOfProd.indexOf(product.id)].quantity += 1));
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  };
  const minusOne = (product: IProdInCart) => {
    setQuantity((productsInCart[listOfProd.indexOf(product.id)].quantity -= 1));
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  };

  const addToCart = (id: number) => {
    setProductsInCart([...productsInCart, { id: id, quantity: 1 }]);
    setListOfProd([...listOfProd, id]);
    localStorage.setItem(
      'productsInCart',
      JSON.stringify([...productsInCart, { id: id, quantity: 1 }])
    );
    localStorage.setItem('listOfProd', JSON.stringify([...listOfProd, id]));
  };
  const delFromCart = (id: number) => {
    setProductsInCart((prev) => {
      localStorage.setItem(
        'productsInCart',
        JSON.stringify(prev.filter((product) => product.id !== id))
      );
      return prev.filter((product) => product.id !== id);
    });
    setListOfProd((prev) => {
      localStorage.setItem(
        'listOfProd',
        JSON.stringify(prev.filter((product) => product !== id))
      );
      return prev.filter((product) => product !== id);
    });
  };

  const resorteCart = () => {
    const list = JSON.parse(localStorage.getItem('listOfProd'));
    const products = JSON.parse(localStorage.getItem('productsInCart'));
    const rs = JSON.parse(localStorage.getItem('rsDiscount'));
    const epm = JSON.parse(localStorage.getItem('epmDiscount'));
    setProductsInCart(products);
    setListOfProd(list);
    setEpmDiscount(epm);
    setRsDiscount(rs);
  };
  const clearCart = () => {
    setProductsInCart([]);
    setListOfProd([]);
    removeEpmDisc;
    removeRsDisc;
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('listOfProd');
    localStorage.removeItem('rsDiscount');
    localStorage.removeItem('epmDiscount');
  };

  return (
    <CartContext.Provider
      value={{
        rsDiscount,
        epmDiscount,
        listOfProd,
        addRsDisc,
        addEpmDisc,
        removeRsDisc,
        removeEpmDisc,
        productsInCart,
        minusOne,
        addOne,
        addToCart,
        delFromCart,
        clearCart,
        resorteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
