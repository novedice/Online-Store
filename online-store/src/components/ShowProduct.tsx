import React, { useContext } from 'react';
import { IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';

interface ProductProps {
  product: IProduct
}

export function ShowProduct({product} : ProductProps) {

const { addToCart, delFromCart, listOfProd, productsInCart } = useContext(CartContext);


const buttonHandler = (product: IProduct) => {
  if (listOfProd.includes(product.id)) {
    delFromCart(product.id);
    console.log('del prod.id', product.id);
    console.log('del list:', listOfProd);
    console.log('del prodincart', productsInCart);
    
  } else {
    addToCart(product.id);
    console.log('add prod.id', product.id);
    console.log('add list:', listOfProd);
    console.log('del prodincart', productsInCart);
    
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
            }}>
          {(listOfProd.includes(product.id)) ? 'Remove' : 'Add'}
        </button>
      </div>
    </>
  )
}
