import React, { useContext } from 'react';
import { IProdInCart, IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
import { findProd } from '../functions/findProduct';
import { Link } from 'react-router-dom';

interface ItemProps {
  item: IProdInCart;
}

export function ShowItem({ item }: ItemProps) {
  const { minusOne, addOne, delFromCart, productsInCart } =
    useContext(CartContext);

  const prod: IProduct = findProd(item.id.toString(10));

  return (
    <>
      <div className="item-in-Cart space-btw flex items-center rounded border px-2 py-2">
        <Link to={`/product-details/${prod.id}`}>
          <div className="flex w-[100%] items-center">
            <img
              src={prod.thumbnail}
              className="image-in-Cart basic-1/5 mb-1 w-1/6 px-1 py-1"
              alt={prod.title}
            ></img>
            <div className="item-description flex basis-2/5 flex-col px-2 py-4">
              <p className="font-bold">{prod.title}</p>
              <p className="">Category: {prod.category}</p>
              <p className="">Price: {prod.price}€</p>
            </div>
          </div>
        </Link>
        <div className="basic-2/5 flex flex-col">
          <div className="in-stock">
            <p>
              in stock: <span>{prod.stock}</span>
            </p>
          </div>
          <div className="item-qty flex">
            <p>Qty: </p>
            <button
              className="minus-one rounded-full border px-2 py-0 text-2xl"
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
              className="plus-one rounded-full border px-2 py-0 text-2xl"
              onClick={() => {
                if (item.quantity < prod.stock) {
                  addOne(item);
                }
              }}
            >
              {' '}
              +{' '}
            </button>
          </div>
          <p className="">Discount: {prod.discountPercentage}%</p>
          <p className="">
            <span className="mr-4 line-through">
              {(
                prod.price *
                (1 + prod.discountPercentage / 100) *
                item.quantity
              ).toFixed(2)}
              €
            </span>
            <span className="text-red-900">{prod.price * item.quantity}€</span>
          </p>
          <p
            className="underline hover:cursor-pointer hover:text-blue-800"
            onClick={() => {
              // console.log('remove');
              delFromCart(item.id);
            }}
          >
            remove item from Cart
          </p>
        </div>
      </div>
    </>
  );
}
