import React from 'react';
import { ItemInBasket } from '../types/types';
// import { addToBasket } from './AddToBasket';

interface ItemProps {
  item: ItemInBasket
}

export function ShowItem({item}: ItemProps) {
  // const [details, setDetails] = useState(false);
  return (
    <>
      <div className='border px-2 py-2 rounded flex items-center space-btw'>
          <img src={item.product.thumbnail} className="basic-1/5 w-1/6 mb-1 px-1 py-1" alt={item.product.title}></img>
          <div className='basis-2/5 flex flex-col px-2 py-4'>
            <p className='font-bold'>{item.product.title}</p>
            <p className=''>Category: {item.product.category}</p>
            <p className=''>Price: {item.product.price}€</p>
          </div>
          <div className='basic-2/5 flex flex-col'>
            <p className=''>Qty: {item.quantity}</p>
            <p className=''>Discount: {item.product.discountPercentage}%</p>
            <p className=''>
              <span className='line-through mr-4'>{((item.product.price * (1 + item.product.discountPercentage / 100)) * item.quantity).toFixed(2)}€</span>
              <span className='text-red-900'>{(item.product.price) * item.quantity}€</span>
            </p>
          </div>
      </div>
    </>
  )
}
