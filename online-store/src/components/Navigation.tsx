import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import {
  calculateTotal,
  calculateTotalDiscount,
} from '../functions/calculateTotal';
// import { useTotal } from '../hooks/calculateTotal';

export function Navigation() {
  // const { total, totalWithDiscount } = useTotal();
  const { listOfProd, rsDiscount, epmDiscount } = useContext(CartContext);
  return (
    <nav className="flex h-11 w-[100%] items-center justify-around bg-gray-600 text-center text-lg font-bold uppercase tracking-wide text-white">
      <div className="ml-5 mr-5 flex items-center">
        <Link to="/">Shop</Link>
      </div>
      <div className="ml-5 mr-5 flex items-center">
        <Link to="/cart">
          ShopCart{' '}
          <span className="text-lg lowercase">
            ({listOfProd.length === 0 ? 0 : listOfProd.length} items)
          </span>
        </Link>
      </div>
      <div>
        <span>
          Total:{' '}
          {(rsDiscount || epmDiscount) && (
            <span className="text-sm font-light italic line-through">
              {calculateTotal().toFixed(2)}€
            </span>
          )}
          <span>{calculateTotalDiscount().toFixed(2)}€</span>
        </span>
      </div>
    </nav>
  );
}
