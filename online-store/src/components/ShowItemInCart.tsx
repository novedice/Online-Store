import React, { useContext } from 'react';
import { IProdInCart, IProduct } from '../types/types';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import {
  styleAllBtn,
  styleBtnPlusMinus,
} from '../styleClassNames/styleConstants';
interface ItemProps {
  item: IProduct;
  itemInCart: IProdInCart;
  index: number;
}

export function ShowItem({ item, itemInCart, index }: ItemProps) {
  const { minusOne, addOne, delFromCart, productsInCart } =
    useContext(CartContext);

  return (
    <>
      <div className="item-in-Cart space-btw mb-2  ml-auto mr-auto flex w-[95%] items-center rounded border-2 border-gray-700 px-2 py-2 text-xl">
        <Link to={`/product-details/${item.id}`}>
          <div className="ml-auto mr-auto flex w-[95%] items-center">
            <div className="">{index}</div>
            <img
              src={item.thumbnail}
              className="image-in-Cart mb-1 w-[50%] px-1 py-1"
              alt={item.title}
            ></img>
            <div className="item-description flex w-[50%] flex-col px-2 py-4">
              <p className="font-bold">{item.title}</p>
              <p className="">Category: {item.category}</p>
              <p className="">Price: {item.price}€</p>
            </div>
          </div>
        </Link>
        <div className="flex w-[100%] flex-col">
          <div className="in-stock">
            <p className="text-sm">
              in stock: <span>{item.stock}</span>
            </p>
          </div>
          <div className="item-qty flex w-[100%] items-center ">
            <p className="m-2">Qty: </p>
            <button
              className={`minus-one ${styleAllBtn} ${styleBtnPlusMinus}`}
              onClick={() => {
                if (itemInCart.quantity === 1) {
                  delFromCart(item.id);
                } else {
                  minusOne(itemInCart);
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
            <span> {itemInCart?.quantity} </span>
            <button
              className={`plus-one ${styleAllBtn} ${styleBtnPlusMinus}`}
              onClick={() => {
                if (itemInCart?.quantity < item.stock) {
                  addOne(itemInCart);
                }
              }}
            >
              {' '}
              +{' '}
            </button>
          </div>
          <p className="">Discount: {item.discountPercentage}%</p>
          <p className="">
            <span className="mr-4 line-through">
              {(
                item.price *
                (1 + item.discountPercentage / 100) *
                itemInCart?.quantity
              ).toFixed(2)}
              €
            </span>
            <span className="text-red-900">
              {item.price * itemInCart?.quantity}€
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
}
