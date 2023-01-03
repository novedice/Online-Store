import React from "react";
import { IProduct } from "../types/types";
// import { Cart} from './AddToCart';
import { App, myCart } from "../App";
import { root } from "..";
import { BrowserRouter } from "react-router-dom";
import { ModalWindowState } from "../Context/ModalWindowContext";
// import { InCartContext } from '../Context/InCartContext';

interface ProductProps {
  product: IProduct;
}

export function ShowProduct({ product }: ProductProps) {

  const btnBgClassName = myCart.isInCart(product) ? 'bg-red-400 hover:bg-red-600' : 'bg-green-400 hover:bg-green-600';
  const btnClasses = ['mb-2 flex rounded items-center  px-4 py-1 mr-3', btnBgClassName];
  const buttonHandler = (product: IProduct) => {
    
    if (product.inCart) {
      myCart.removeFromCart(product);
    } else {
      myCart.addToCart(product);
    }
    root.render(
      <BrowserRouter>
        <ModalWindowState>
          <App />
        </ModalWindowState>
      </BrowserRouter>
    );
  };
  
  return (
    <>
      <div 
      className="flex flex-col items-center rounded border w-1/4 bg-local bgrd justify-between" 
      style={{
        backgroundImage: `url(${product.thumbnail})`,
        backgroundSize: 'cover',
        height: '250px'
        }}> 
        
        <p className="font-bold title text-lg bg-slate-600 w-full text-center">{product.title}</p>
        <div className="text-xs bg-slate-300 flex flex-col justify-start">
          <p className="category"><span className="font-bold">Category: </span>{product.category}</p>
          <p className="brand"><span className="font-bold">Brand: </span>{product.brand}</p>
          <p className="price"><span className="font-bold">Price: </span>{product.price}</p>
          <p className="discountPercentage"><span className="font-bold">Discount: </span>{product.discountPercentage}</p>
          <p className="rating"><span className="font-bold">Rating: </span>{product.rating}</p>
          <p className="stock"><span className="font-bold">Stock: </span>{product.stock}</p>
        </div>
        <div className="button-wrapper flex justify-between">
        <button
          className={btnClasses.join(' ')}
          onClick={() => {
            buttonHandler(product);
            console.log("before ", product.inCart);
          }}
        >
          {myCart.isInCart(product) ? "Drop from Cart" : "Add to Cart"}
        </button>
        <button className="mb-2 flex rounded items-center px-4 py-1 bg-slate-300">Details</button>
        </div>

      </div>
    </>
  );
}
