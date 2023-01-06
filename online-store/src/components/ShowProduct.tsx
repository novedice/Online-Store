import React, { useContext } from 'react';
import { IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';

export interface ProductProps {
  product: IProduct;
}

export function ShowProduct({ product }: ProductProps) {
  const { addToCart, delFromCart, listOfProd, productsInCart } =
    useContext(CartContext);

  const btnBgClassName = listOfProd.includes(product.id)
    ? 'bg-red-400 hover:bg-red-600'
    : 'bg-green-400 hover:bg-green-600';
  const btnClasses = [
    'mb-2 flex rounded items-center  px-4 py-1 mr-3',
    btnBgClassName,
  ];

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
  };

  return (
    <>
      <div
        className="bgrd flex w-1/4 flex-col items-center justify-between rounded border bg-local"
        style={{
          backgroundImage: `url(${product.thumbnail})`,
          backgroundSize: 'cover',
          height: '250px',
        }}
      >
        <p className="title w-full bg-slate-600 text-center text-lg font-bold">
          {product.title}
        </p>
        <div className="flex flex-col justify-start bg-slate-300 text-xs">
          <p className="category">
            <span className="font-bold">Category: </span>
            {product.category}
          </p>
          <p className="brand">
            <span className="font-bold">Brand: </span>
            {product.brand}
          </p>
          <p className="price">
            <span className="font-bold">Price: </span>
            {product.price}
          </p>
          <p className="discountPercentage">
            <span className="font-bold">Discount: </span>
            {product.discountPercentage}
          </p>
          <p className="rating">
            <span className="font-bold">Rating: </span>
            {product.rating}
          </p>
          <p className="stock">
            <span className="font-bold">Stock: </span>
            {product.stock}
          </p>
        </div>
        <div className="button-wrapper flex justify-between">
          <button
            className={btnClasses.join(' ')}
            onClick={() => {
              buttonHandler(product);
            }}
          >
            {listOfProd.includes(product.id) ? 'Remove' : 'Add'}
            {/* {myCart.isInCart(product.) ? "Drop from Cart" : "Add to Cart"} */}
          </button>
          <Link to={`/product-details/${product.id}`}>
            <button className="mb-2 flex items-center rounded bg-slate-300 px-4 py-1">
              Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
