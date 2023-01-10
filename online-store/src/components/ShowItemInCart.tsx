import React, { useContext, useEffect, useState } from 'react';
import { IProdInCart, IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
// import { findProd } from '../functions/findProduct';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/products';

interface ItemProps {
  item: IProdInCart;
  page?: number;
}

export function ShowItem({ item }: ItemProps) {
  const { minusOne, addOne, delFromCart, productsInCart } =
    useContext(CartContext);
  const [currentProd, setCurrentProd] = useState<IProduct>();
  const [error, setError] = useState(false);

  const { allProd, loading } = useProducts();

  useEffect(() => {
    setError(false);
    if (allProd.length && item.id) {
      const findProduct = allProd.find((product) => product.id === item.id);

      if (findProduct) {
        setCurrentProd(findProduct);
      } else {
        setError(true);
      }
    }
  }, [allProd.length]);

  if (loading) {
    return <div>loading...</div>;
  } else if (currentProd) {
    return (
      <>
        <div className="item-in-Cart space-btw mb-2  ml-auto mr-auto flex w-[95%] items-center rounded border-2 border-gray-700 px-2 py-2 text-xl">
          <Link to={`/product-details/${currentProd.id}`}>
            <div className="ml-auto mr-auto flex w-[95%] items-center">
              <img
                src={currentProd.thumbnail}
                className="image-in-Cart mb-1 w-[50%] px-1 py-1"
                alt={currentProd.title}
              ></img>
              <div className="item-description flex w-[50%] flex-col px-2 py-4">
                <p className="font-bold">{currentProd.title}</p>
                <p className="">Category: {currentProd.category}</p>
                <p className="">Price: {currentProd.price}€</p>
              </div>
            </div>
          </Link>
          <div className="flex w-[100%] flex-col">
            <div className="in-stock">
              <p className="text-sm">
                in stock: <span>{currentProd.stock}</span>
              </p>
            </div>
            <div className="item-qty flex w-[100%] items-center ">
              <p className="m-2">Qty: </p>
              <button
                className="minus-one m-2
                      flex
                      h-[30px]
                      w-[30px]
                      flex-shrink-0
                      items-center justify-center
                      rounded-full
                      border-4 border-teal-500 bg-teal-500 px-2 py-0 text-2xl text-white hover:border-teal-700 hover:bg-teal-700"
                onClick={() => {
                  if (item.quantity === 1) {
                    delFromCart(item.id);
                  } else {
                    minusOne(item);
                    localStorage.setItem(
                      'productsInCart',
                      JSON.stringify(productsInCart)
                    );
                  }
                }}
              >
                {' '}
                -{' '}
              </button>
              <span> {item.quantity} </span>
              <button
                className="plus-one m-2
                      flex
                      h-[30px]
                      w-[30px]
                      flex-shrink-0
                      items-center justify-center
                      rounded-full
                      border-4 border-teal-500 bg-teal-500 px-2 py-0 text-2xl text-white hover:border-teal-700 hover:bg-teal-700"
                onClick={() => {
                  if (item.quantity < currentProd.stock) {
                    addOne(item);
                  }
                }}
              >
                {' '}
                +{' '}
              </button>
            </div>
            <p className="">Discount: {currentProd.discountPercentage}%</p>
            <p className="">
              <span className="mr-4 line-through">
                {(
                  currentProd.price *
                  (1 + currentProd.discountPercentage / 100) *
                  item.quantity
                ).toFixed(2)}
                €
              </span>
              <span className="text-red-900">
                {currentProd.price * item.quantity}€
              </span>
            </p>
            <p
              className="underline hover:cursor-pointer hover:text-blue-800"
              onClick={() => {
                delFromCart(item.id);
              }}
            >
              remove item from Cart
            </p>
          </div>
        </div>
      </>
    );
  } else if (error) {
    return (
      <>
        <div className="flex min-h-[600px] flex-col items-center justify-center text-3xl">
          <p className="text-center">PAGE NOT FOUND (404)</p>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
