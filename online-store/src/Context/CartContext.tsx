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
});

export const CartState = ({ children }: { children: React.ReactNode }) => {
  const [rsDiscount, setRsDiscount] = useState(false);
  const [epmDiscount, setEpmDiscount] = useState(false);
  const [productsInCart, setProductsInCart] = useState<IProdInCart[]>([]);
  const [listOfProd, setListOfProd] = useState<number[]>([]);

  const addRsDisc = () => {
    setRsDiscount(true);
    localStorage.setItem('rsDiscount', JSON.stringify(rsDiscount));
  };
  const addEpmDisc = () => {
    setEpmDiscount(true);
    localStorage.setItem('epmDiscount', JSON.stringify(epmDiscount));
  };
  const removeRsDisc = () => {
    setRsDiscount(false);
    localStorage.setItem('rsDiscount', JSON.stringify(rsDiscount));
  };
  const removeEpmDisc = () => {
    setEpmDiscount(false);
    localStorage.setItem('epmDiscount', JSON.stringify(epmDiscount));
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
    setProductsInCart((prev) => [...prev, { id: id, quantity: 1 }]);
    setListOfProd((prev) => [...prev, id]);
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    localStorage.setItem('listOfProd', JSON.stringify(listOfProd));
  };
  const delFromCart = (id: number) => {
    setProductsInCart((prev) => prev.filter((product) => product.id !== id));
    setListOfProd((prev) => prev.filter((product) => product !== id));
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    localStorage.setItem('listOfProd', JSON.stringify(listOfProd));
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
