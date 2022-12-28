import React from 'react';
import { IProduct } from '../types/types';
// import { Basket} from './AddToBasket';
import { myBasket } from '../App'
// import { InBasketContext } from '../Context/InBasketContext';

interface ProductProps {
  product: IProduct
}

export const ifInBasket = (product: IProduct) => {
  if (myBasket.basketList.indexOf(product.title) === -1) {
    return false
  } else {
    return true
  }
}

export function ShowProduct({product} : ProductProps) {

// const {inBasket, addIn, removeFrom} = useContext(InBasketContext);


const buttonHandler = (product: IProduct) => {
  console.log('before ', product.inBasket);
  if (product.inBasket) {
    console.log('remove');
    myBasket.removeFromBasket(product)
    
    console.log('after remove:', product.inBasket)
  } else {
    myBasket.addToBasket(product)
    console.log('after add: ', product.inBasket)
  }
}

  return (
    <>
      <div className='border px-2 py-2 rounded flex items-center'>
        <img src={product.thumbnail} className="w-1/6 mb-1 px-1 py-1" alt={product.title}></img>
        <p className='font-bold'>{product.title}</p>
        <p className='font-bold'>{product.price}</p>
        <p className='font-bold'>{product.discountPercentage}</p>
        <button 
            className='btnAddToBasket px-2 py-4 flex items-center border mb-2' 
            onClick={() => {
              buttonHandler(product);
              // console.log('before ', product.inBasket);
              // if (product.inBasket) {
              //   console.log('remove');
              //   myBasket.removeFromBasket(product)
              //   // removeFrom();
              //   console.log('after remove:', product.inBasket)
              // } else {
              //   myBasket.addToBasket(product)
              //   // addIn();
              //   console.log('after add: ', product.inBasket)
              // }
            }}>
          {!product.inBasket ? 'Add' : 'Remove'}
        </button>
      </div>
    </>
  )
}
