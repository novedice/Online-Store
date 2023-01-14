import React, { useContext } from 'react';
import { IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { VIEW } from '../types/enums';

export interface ProductProps {
  product: IProduct;
  view: VIEW;
}

export function ShowProduct({ product, view }: ProductProps) {
  const { addToCart, delFromCart, listOfProd } = useContext(CartContext);

  const btnBgClassName = listOfProd.includes(product.id)
    ? 'bg-red-400 hover:bg-red-600'
    : 'bg-green-400 hover:bg-green-600';
  const btnClasses = [
    'mb-2 flex rounded items-center  px-4 py-1 mr-3',
    btnBgClassName,
  ];

  const buttonHandler = (prod: IProduct) => {
    if (listOfProd.includes(prod.id)) {
      delFromCart(prod.id);
    } else {
      addToCart(prod.id);
    }
  };

  return (
    <>
      {VIEW.List === view && (
        <div
          className="bgrd mb-3 flex flex-row items-center justify-center rounded border bg-slate-50 bg-local px-4"
          style={{ width: 700 }}
        >
          <div className="flex flex-col">
            <p className="title mb-1 text-center text-lg font-bold">
              {product.title}
            </p>
            <img
              src={product.thumbnail}
              alt="photo"
              style={{ height: 200, width: 300 }}
            ></img>
          </div>
          <div className="m-2 my-10 flex flex-col justify-between p-4 text-xs leading-7">
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
            </button>
            <Link to={`/product-details/${product.id}`}>
              <button className="flex items-center rounded bg-slate-300 px-4 py-1">
                Details
              </button>
            </Link>
          </div>
        </div>
      )}
      {VIEW.Block === view && (
        <div
          className="bgrd flex w-1/4 flex-col flex-nowrap items-center justify-between rounded border bg-local"
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
            </button>
            <Link to={`/product-details/${product.id}`}>
              <button className="mb-2 flex items-center rounded bg-slate-300 px-4 py-1">
                Details
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
