import { IBasket, IProduct, ItemInBasket } from '../types/types';

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

    if (this.basketList.indexOf(product.title) === -1) {
      this.basketList.push(product.title);
      this.productsInBasket.push((itemInBasket as ItemInBasket));
    } else {
      console.log(this.productsInBasket[this.basketList.indexOf(product.title)])
      this.productsInBasket[this.basketList.indexOf(product.title)].quantity += 1;
    }

    this.summaryItems += 1;
    this.totalPay += product.price;

  }

  removeFromBasket(product: IProduct) {

    const index = this.basketList.indexOf(product.title);
    this.basketList.splice(index, 1);
    this.productsInBasket.splice(index, 1);
    this.summaryItems -= 1;
    this.totalPay -= product.price
  }
}

