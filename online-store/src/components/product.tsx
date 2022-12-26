import React from 'react';
import { IProduct } from '../types/types';
import { addToBasket } from './AddToBasket';

interface ProductProps {
  product: IProduct
}

export function ShowProduct(props: ProductProps) {
  // const [details, setDetails] = useState(false);
  return (
    <>
      <div className='border px-2 py-2 rounded flex items-center'>
        <img src={props.product.thumbnail} className="w-1/6 mb-1 px-1 py-1" alt={props.product.title}></img>
        <p className='font-bold'>{props.product.title}</p>
        <p className='font-bold'>{props.product.price}</p>
        <p className='font-bold'>{props.product.discountPercentage}</p>
        <button className='btnAddToBasket px-2 py-4 flex items-center border mb-2' onClick={() => addToBasket(props.product)}>Add</button>
      </div>
    </>
  )
}
