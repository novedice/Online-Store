import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { IProduct } from '../types/types';
import { useParams } from 'react-router-dom';
import { allProducts } from '../hooks/products';

type QParam = {
  id: string;
};

export function ProductDetailsPage() {
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

  function findProd(id: string): IProduct {
    let i = 0;
    while (allProducts[i].id !== parseInt(id)) {
      i += 1;
    }
    return allProducts[i];
  }
  const product: IProduct = findProd(id);
  console.log(product);

  return (
    <>
      <div className="details">
        <div className="prod-title">{product.title}</div>
        <div>
          <div className="small-images">
            <img>{}</img>
            <img></img>
            <img></img>
          </div>
          <div className="big-image">
            <img></img>
          </div>
          <div className="description-block">
            <div className="description">{product.description}</div>
            <div className="brand">{product.brand}</div>
            <div className="category">{product.category}</div>
            <div className="discount-percentage">
              {product.discountPercentage}
            </div>
            <div className="rating">{product.rating}</div>
            <div className="in-stock">{product.stock}</div>
          </div>
          <div className="price-block">
            <div className="proce">{product.price}</div>
            <button
              className="add-remove"
              onClick={() => buttonHandler(product)}
            >
              {listOfProd.includes(product.id) ? 'Remove' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
