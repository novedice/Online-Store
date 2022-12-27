import React, { useState } from 'react';
import { IProduct } from '../types/types';
// import { Basket} from './AddToBasket';
import { myBasket } from '../App'

interface ProductProps {
  product: IProduct
}

export function ShowProduct({product} : ProductProps) {

const [inBasket, setInBasket] = useState(false);

const buttonHandler = (product: IProduct) => {
  if (inBasket) {
    console.log('remove');
    myBasket.removeFromBasket(product)
  } else {
    myBasket.addToBasket(product)
  }
  setInBasket(prev => !prev);
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
            onClick={() => buttonHandler(product)}>
          {inBasket ? 'Remove' : 'Add'}
        </button>
      </div>
    </>
  )
}
