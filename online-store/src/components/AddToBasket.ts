// import React from 'react';
import { basket, basketList } from '../App';
import { IProduct, ItemInBasket } from '../types/types';

export function addToBasket(product: IProduct) {

  let itemInBasket = {};
  Object.assign(itemInBasket,[product]);
  console.log(itemInBasket);
  // (itemInBasket as ItemInBasket).quantity = 0;
  if (basketList.indexOf(product.title) === -1) {
    basketList.push(product.title);
    basket.push((itemInBasket as ItemInBasket));
    basket[basket.length-1].quantity = 1;
  } else {
    basket[basketList.indexOf(product.title)].quantity += 1;
  }
  console.log('basket:', basket, 'basketList:', basketList)
}