// import React from 'react';
// import { basket, basketList } from '../App';
import { IBasket, IProduct, ItemInBasket } from '../types/types';
// import { productsInBasket } from '../App';

export class Basket implements IBasket {
  productsInBasket: ItemInBasket[];
  basketList: string[];
  summaryItems: number;
  totalPay: number;
  
  constructor(productsInBasket: ItemInBasket[], basketList: string[], summaryItem: number, totalPay: number) {
    this.productsInBasket = productsInBasket
    this.basketList = basketList
    this.summaryItems = summaryItem
    this.totalPay = totalPay
  }
  addToBasket(product: IProduct) {
    let itemInBasket: ItemInBasket = {
      product: product,
      quantity: 1
    };
    console.log(itemInBasket);
    // (itemInBasket as ItemInBasket).quantity = 0;
    if (this.basketList.indexOf(product.title) === -1) {
      this.basketList.push(product.title);
      this.productsInBasket.push((itemInBasket as ItemInBasket));
      // basket[basket.length-1].quantity = 1;
    } else {
      console.log(this.productsInBasket[this.basketList.indexOf(product.title)])
      this.productsInBasket[this.basketList.indexOf(product.title)].quantity += 1;
    }
    console.log('basket:', this.productsInBasket, 'basketList:', this.basketList)
    this.summaryItems += 1;
    this.summaryItems += product.price;
  }
}

// export function addToBasket(product: IProduct) {

//   let itemInBasket: ItemInBasket = {
//     product: product,
//     quantity: 1
//   };
//   console.log(itemInBasket);
//   // (itemInBasket as ItemInBasket).quantity = 0;
//   if (basketList.indexOf(product.title) === -1) {
//     basketList.push(product.title);
//     basket.push((itemInBasket as ItemInBasket));
//     // basket[basket.length-1].quantity = 1;
//   } else {
//     console.log(basket[basketList.indexOf(product.title)])
//     basket[basketList.indexOf(product.title)].quantity += 1;
//   }
//   console.log('basket:', basket, 'basketList:', basketList)
// }