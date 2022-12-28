import { myCart } from '../App';
import { ICart, IProduct, ItemInCart } from '../types/types';

export class Cart implements ICart {

  productsInCart: ItemInCart[];
  cartList: string[];
  summaryItems: number;
  totalPay: number;
  
  constructor(productsInCart: ItemInCart[], cartList: string[], summaryItem: number, totalPay: number) {

    this.productsInCart = productsInCart
    this.cartList = cartList
    this.summaryItems = summaryItem
    this.totalPay = totalPay
  }

  addToCart(product: IProduct) {
    
    product.inCart = true;

    let itemInCart: ItemInCart = {
      product: product,
      quantity: 1
    };

    if (this.cartList.indexOf(product.title) === -1) {
      this.cartList.push(product.title);
      this.productsInCart.push((itemInCart as ItemInCart));
    } else {
      console.log(this.productsInCart[this.cartList.indexOf(product.title)])
      this.productsInCart[this.cartList.indexOf(product.title)].quantity += 1;
    }

    this.summaryItems += 1;
    this.totalPay += product.price;
    console.log(myCart);

  }

  removeFromCart(product: IProduct) {
    
    const index = this.cartList.indexOf(product.title);
    
    product.inCart = false;

    this.cartList.splice(index, 1);
    this.summaryItems -= this.productsInCart[index].quantity;
    this.totalPay -= (product.price * this.productsInCart[index].quantity);
    this.productsInCart.splice(index, 1);
    console.log(myCart);
  }

  addOneMore(product: IProduct) {

    const index = this.cartList.indexOf(product.title);
    
    if (this.productsInCart[index].quantity >= this.productsInCart[index].product.stock) {
      return
    }

    this.productsInCart[index].quantity += 1;
    this.totalPay += product.price;
    this.summaryItems += 1; 
    console.log(myCart);

  }

  minusOneMore(product: IProduct) {

    const index = this.cartList.indexOf(product.title);
    
    if (this.productsInCart[index].quantity <= 0) {
      return
    }

    this.productsInCart[index].quantity -= 1;
    this.totalPay -= product.price;
    this.summaryItems -= 1; 
    console.log(myCart);

  }

  isInCart(product: IProduct) {
    if (this.cartList.indexOf(product.title) === -1) {
      return false
    } else {
      return true
    }
  }
}

