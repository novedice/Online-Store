import React, { useContext } from 'react';
import { IProdInCart, IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
import { allProducts } from '../hooks/products';


interface ItemProps {
  item: IProdInCart
}

export function ShowItem({item}: ItemProps) {

  const { minusOne, addOne, delFromCart } = useContext(CartContext);

 
  function findProd(it: IProdInCart): IProduct {
    let i = 0;
    while (allProducts[i].id !== it.id) {
      i += 1;
    }
    return allProducts[i];
  }
  
  const prod: IProduct = findProd(item);

  return (
    <>
      <div className='item-in-Cart border px-2 py-2 rounded flex items-center space-btw'>
          <img src={ prod.thumbnail } className="image-in-Cart basic-1/5 w-1/6 mb-1 px-1 py-1" alt={ prod.title }></img>
          <div className='item-description basis-2/5 flex flex-col px-2 py-4'>
            <p className='font-bold'>{ prod.title }</p>
            <p className=''>Category: { prod.category }</p>
            <p className=''>Price: { prod.price }€</p>
          </div>
          <div className='basic-2/5 flex flex-col'>
            <div className='in-stock'><p>in stock: <span>{ prod.stock }</span></p></div>
            <div className='item-qty flex'>
              <p>Qty: </p>
              <button 
                  className='minus-one border rounded-full px-2 py-0 text-2xl'
                  onClick={() => {
                    if (item.quantity === 1) {
                      delFromCart(item.id);
                    } else {
                      minusOne(item);
                    }

                  }}> - </button>
              <span> { item.quantity } </span>
              <button 
                  className='plus-one border rounded-full px-2 py-0 text-2xl'
                  onClick={() => {
                    if (item.quantity < prod.stock) {
                      addOne(item);
                    }
                    }}> + </button>
            </div>
            <p className=''>Discount: {prod.discountPercentage}%</p>
            <p className=''>
              <span className='line-through mr-4'>{((prod.price * (1 + prod.discountPercentage / 100)) * item.quantity).toFixed(2)}€</span>
              <span className='text-red-900'>{(prod.price) * item.quantity}€</span>
            </p>
            <p className='underline hover:text-blue-800 hover:cursor-pointer' 
              onClick={() => {
              // console.log('remove');
              delFromCart(item.id);
              }}>remove item from Cart</p>
          </div>
      </div>
    </>
  );
}