import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { IProduct } from '../types/types';
import { Link, useParams } from 'react-router-dom';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { useProducts } from '../hooks/products';

type QParam = {
  id: string;
};

export function ProductDetailsPage() {
  const { open } = useContext(ModalWindowContext);
  const { listOfProd, addToCart, delFromCart } = useContext(CartContext);
  const { id } = useParams<QParam>();
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  const [prodImageBig, setProdImageBig] = useState<string>('');
  const [error, setError] = useState(false);

  const { allProd, loading } = useProducts();

  useEffect(() => {
    setError(false);
    if (allProd.length && id) {
      const findProduct = allProd.find((product) => product.id === +id);

      if (findProduct) {
        setCurrentProduct(findProduct);
        setProdImageBig(findProduct.images[0]);
      } else {
        setError(true);
      }
    }
  }, [allProd.length]);

  const buttonHandler = (product: IProduct) => {
    if (listOfProd.includes(product.id)) {
      delFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  function changeImage(img: string): void {
    setProdImageBig(img);
  }
  console.log('load', loading);
  if (loading) {
    return <div>loading</div>;
  } else if (currentProduct) {
    return (
      <>
        <div className="path ml-auto mr-auto flex w-[60%] justify-between text-xl uppercase">
          <Link to="/">
            <span>Store</span>
          </Link>
          <span> ⋯ </span>
          <span>{currentProduct?.category}</span>
          <span> ⋯ </span>
          <span>{currentProduct?.brand}</span>
          <span> ⋯ </span>
          <span>{currentProduct?.title}</span>
        </div>
        <div className="details ml-auto mr-auto  mt-5 mb-5 flex w-[90%] flex-col rounded-lg border-4">
          <div className="prod-title  border bg-gray-600 text-center text-lg font-bold uppercase tracking-wide text-white">
            {currentProduct?.title}
          </div>
          <div className="flex w-[100%] items-center justify-around">
            <div className="small-images flex w-[10%] flex-col">
              <div className="flex items-center rounded border">
                <img
                  className="max-w-100%"
                  onClick={() => changeImage(currentProduct?.images[0])}
                  src={currentProduct?.images[0]}
                ></img>
              </div>
              <div className="flex items-center rounded border">
                <img
                  className="max-w-100%"
                  onClick={() => changeImage(currentProduct?.images[2])}
                  src={currentProduct?.images[2]}
                ></img>
              </div>
              <div className="flex items-center rounded border">
                <img
                  className="max-w-100%"
                  onClick={() => changeImage(currentProduct?.images[3])}
                  src={currentProduct?.images[3]}
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
              <p className="description text-center">
                {currentProduct?.description}
              </p>
              <p className="brand w-[100%] border bg-gray-600 text-center text-white">
                Brand
              </p>
              <p className="brand text-center">{currentProduct?.brand}</p>
              <p className="category w-[100%] border bg-gray-600 text-center text-white">
                Category
              </p>
              <p className="category text-center">{currentProduct?.category}</p>
              <p className="discount-percentage w-[100%] border bg-gray-600 text-center text-white">
                Discount
              </p>
              <p className="discount-percentage text-center">
                {currentProduct?.discountPercentage}%
              </p>
              <p className="rating w-[100%] border bg-gray-600 text-center text-white">
                rating
              </p>
              <p className="rating text-center">{currentProduct?.rating}</p>
              <p className="in-stock w-[100%] border bg-gray-600 text-center text-white">
                In stock
              </p>
              <p className="in-stock text-center">{currentProduct?.stock}</p>
            </div>
            <div className="price-block flex w-[20%] flex-col">
              <div className="price text-center text-2xl font-bold uppercase tracking-wide text-gray-700">
                {currentProduct?.price}€
              </div>
              <button
                className="add-remove mb-3 flex-shrink-0 rounded border-4 border-gray-500 bg-gray-500 py-1 px-2 text-lg text-white hover:border-gray-700 hover:bg-gray-700"
                onClick={() => buttonHandler(currentProduct)}
              >
                {listOfProd.includes(currentProduct?.id) ? 'Remove' : 'Add'}
              </button>
              <Link to="/cart">
                <button
                  className="buy-now w-[100%] flex-shrink-0 rounded border-4 border-gray-500 bg-gray-500 py-1 px-2 text-lg text-white hover:border-gray-700 hover:bg-gray-700"
                  onClick={() => {
                    if (!listOfProd.includes(currentProduct?.id)) {
                      addToCart(currentProduct?.id);
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
