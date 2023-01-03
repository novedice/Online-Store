/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";
import { ICartContext, IProdInCart } from "../types/types";

// interface setProductsInCart: React.Dispatch<React.SetStateAction<IProdInCart[]>>

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
})

export const CartState = ({ children }: { children: React.ReactNode }) => {

  const [rsDiscount, setRsDiscount] = useState(false);
  const [epmDiscount, setEpmDiscount] = useState(false);
  const [productsInCart, setProductsInCart] = useState<IProdInCart[]>([]);
  const [listOfProd, setListOfProd] = useState<number[]>([]);

  const addRsDisc = () => setRsDiscount (true);
  const addEpmDisc = () => setEpmDiscount (true);
  const removeRsDisc = () => setRsDiscount (false);
  const removeEpmDisc = () => setEpmDiscount (false);

  const [quantity, setQuantity] = useState<number>(1);
  const addOne = (product: IProdInCart) => {
    setQuantity(productsInCart[listOfProd.indexOf(product.id)].quantity += 1);
  };
  const minusOne = (product: IProdInCart) => {
    setQuantity(productsInCart[listOfProd.indexOf(product.id)].quantity -= 1);
  };
  
  const addToCart = (id: number) => {
    setProductsInCart(prev => [...prev, {id: id, quantity: 1}]);
    setListOfProd((prev) => [...prev, id]);
  }
  const delFromCart = (id: number) => {
    setProductsInCart(prev => prev.filter(product => product.id !== id));
    setListOfProd(prev => prev.filter(product => product !== id));
  }

  return (
    <CartContext.Provider value = { { rsDiscount, epmDiscount, listOfProd, addRsDisc, addEpmDisc,
     removeRsDisc, removeEpmDisc, productsInCart, minusOne, addOne, addToCart, delFromCart } }>
      { children }
    </CartContext.Provider>
  )
}