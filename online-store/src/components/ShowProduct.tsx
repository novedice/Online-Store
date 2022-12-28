import React from 'react';
import { IProduct } from '../types/types';
// import { Cart} from './AddToCart';
import { myCart } from '../App'
// import { InCartContext } from '../Context/InCartContext';

interface ProductProps {
  product: IProduct
}

export function ShowProduct({product} : ProductProps) {

// const {inCart, addIn, removeFrom} = useContext(InCartContext);


const buttonHandler = (product: IProduct) => {
  console.log('before ', product.inCart);
  if (product.inCart) {
    console.log('remove');
    myCart.removeFromCart(product)
    
    console.log('after remove:', product.inCart)
  } else {
    myCart.addToCart(product)
    console.log('after add: ', product.inCart)
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
            className='btnAddToCart px-2 py-4 flex items-center border mb-2' 
            onClick={() => {
              buttonHandler(product);
              // console.log('before ', product.inCart);
              // if (product.inCart) {
              //   console.log('remove');
              //   myCart.removeFromCart(product)
              //   // removeFrom();
              //   console.log('after remove:', product.inCart)
              // } else {
              //   myCart.addToCart(product)
              //   // addIn();
              //   console.log('after add: ', product.inCart)
              // }
            }}>
          {myCart.isInCart(product) ? 'Remove' : 'Add'}
        </button>
      </div>
    </>
  )
}
