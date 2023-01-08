import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { IProduct } from '../types/types';
import { Link, useParams } from 'react-router-dom';
// import { allProducts } from '../hooks/products';
import { findProd } from '../functions/findProduct';
import { ModalWindowContext } from '../Context/ModalWindowContext';

type QParam = {
  id: string;
};

export function ProductDetailsPage() {
  const { open } = useContext(ModalWindowContext);

  const { id } = useParams<QParam>();
  const { addToCart, delFromCart, listOfProd } = useContext(CartContext);

  const buttonHandler = (product: IProduct) => {
    if (listOfProd.includes(product.id)) {
      delFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };
  console.log(id);

  const product: IProduct = findProd(id as string);
  const [prodImageBig, setProdImageBig] = useState<string>(product.images[0]);

  function changeImage(img: string): void {
    setProdImageBig(img);
  }

  return (
    <>
      <div className="path ml-auto mr-auto flex w-[60%] justify-between text-xl uppercase">
        <Link to="/">
          <span>Store</span>
        </Link>
        <span> ⋯ </span>
        <span>{product.category}</span>
        <span> ⋯ </span>
        <span>{product.brand}</span>
        <span> ⋯ </span>
        <span>{product.title}</span>
      </div>
      <div className="details ml-auto mr-auto  mt-5 mb-5 flex w-[90%] flex-col rounded-lg border-4">
        <div className="prod-title  border bg-gray-600 text-center text-lg font-bold uppercase tracking-wide text-white">
          {product.title}
        </div>
        <div className="flex w-[100%] items-center justify-around">
          <div className="small-images flex w-[10%] flex-col">
            <div className="flex items-center rounded border">
              <img
                className="max-w-100%"
                onClick={() => changeImage(product.images[0])}
                src={product.images[0]}
              ></img>
            </div>
            <div className="flex items-center rounded border">
              <img
                className="max-w-100%"
                onClick={() => changeImage(product.images[2])}
                src={product.images[2]}
              ></img>
            </div>
            <div className="flex items-center rounded border">
              <img
                className="max-w-100%"
                onClick={() => changeImage(product.images[3])}
                src={product.images[3]}
              ></img>
            </div>
          </div>
          <div className="big-image flex w-[30%] items-center rounded border">
            <img className="max-w-[100%]" src={prodImageBig}></img>
          </div>
          <div className="description-block flex w-[35%] flex-col items-center border">
            <p className="description w-[100%] border bg-gray-600 text-center text-white">
              Description
            </p>
            <p className="description text-center">{product.description}</p>
            <p className="brand w-[100%] border bg-gray-600 text-center text-white">
              Brand
            </p>
            <p className="brand text-center">{product.brand}</p>
            <p className="category w-[100%] border bg-gray-600 text-center text-white">
              Category
            </p>
            <p className="category text-center">{product.category}</p>
            <p className="discount-percentage w-[100%] border bg-gray-600 text-center text-white">
              Discount
            </p>
            <p className="discount-percentage text-center">
              {product.discountPercentage}%
            </p>
            <p className="rating w-[100%] border bg-gray-600 text-center text-white">
              rating
            </p>
            <p className="rating text-center">{product.rating}</p>
            <p className="in-stock w-[100%] border bg-gray-600 text-center text-white">
              In stock
            </p>
            <p className="in-stock text-center">{product.stock}</p>
          </div>
          <div className="price-block flex w-[20%] flex-col">
            <div className="price text-center text-2xl font-bold uppercase tracking-wide text-gray-700">
              {product.price}€
            </div>
            <button
              className="add-remove flex-shrink-0 rounded border-4 border-gray-500 bg-gray-500 py-1 px-2 text-lg text-white hover:border-gray-700 hover:bg-gray-700"
              onClick={() => buttonHandler(product)}
            >
              {listOfProd.includes(product.id) ? 'Remove' : 'Add'}
            </button>
            <Link to="/cart">
              <button
                className="buy-now w-[100%] flex-shrink-0 rounded border-4 border-gray-500 bg-gray-500 py-1 px-2 text-lg text-white hover:border-gray-700 hover:bg-gray-700"
                onClick={() => {
                  if (!listOfProd.includes(product.id)) {
                    addToCart(product.id);
                  }
                  open();
                }}
              >
                Buy now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
