import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { useProducts } from '../hooks/products';

export function Navigation() {
  const { allProd, loading } = useProducts();
  const { listOfProd, rsDiscount, epmDiscount, productsInCart } =
    useContext(CartContext);

  if (loading) {
    return <div>loading...</div>;
  } else if (allProd) {
    return (
      <nav className="mb-3 flex h-11 w-[100%] items-center justify-around bg-gray-600 text-center text-lg font-bold uppercase tracking-wide text-white">
        <div className="ml-5 mr-5 flex items-center">
          <Link to="/">Shop</Link>
        </div>
        <div className="ml-5 mr-5 flex items-center">
          {/* <Link to={`/product-details/${item.id}`}></Link> */}
          <Link to={`/cart/${1}`}>
            ShopCart{' '}
            <span className="text-lg lowercase">
              (
              {listOfProd.length === 0
                ? 0
                : productsInCart.reduce(
                    (sum, curItem) => sum + curItem.quantity,
                    0
                  )}{' '}
              {listOfProd.length === 0 ||
              productsInCart.reduce(
                (sum, curItem) => sum + curItem.quantity,
                0
              ) > 1
                ? 'products'
                : 'product'}
              )
            </span>
          </Link>
        </div>
        <div>
          <span>
            Total:{' '}
            {(rsDiscount || epmDiscount) && (
              <span className="mr-2 text-sm font-light italic line-through">
                {allProd
                  .filter((product) => listOfProd.includes(product.id))
                  .reduce(
                    (acc, curVal) =>
                      acc +
                      curVal.price *
                        productsInCart[listOfProd.indexOf(curVal.id)].quantity,
                    0
                  )
                  .toFixed(2)}
                €
              </span>
            )}
            {/* <span>{calculateTotalDiscount().toFixed(2)}€</span> */}
            <span>
              {rsDiscount && epmDiscount
                ? (
                    allProd
                      .filter((product) => listOfProd.includes(product.id))
                      .reduce(
                        (acc, curVal) =>
                          acc +
                          curVal.price *
                            productsInCart[listOfProd.indexOf(curVal.id)]
                              .quantity,
                        0
                      ) * 0.8
                  ).toFixed(2)
                : rsDiscount || epmDiscount
                ? (
                    allProd
                      .filter((product) => listOfProd.includes(product.id))
                      .reduce(
                        (acc, curVal) =>
                          acc +
                          curVal.price *
                            productsInCart[listOfProd.indexOf(curVal.id)]
                              .quantity,
                        0
                      ) * 0.9
                  ).toFixed(2)
                : allProd
                    .filter((product) => listOfProd.includes(product.id))
                    .reduce(
                      (acc, curVal) =>
                        acc +
                        curVal.price *
                          productsInCart[listOfProd.indexOf(curVal.id)]
                            .quantity,
                      0
                    )
                    .toFixed(2)}
              €
            </span>
          </span>
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
}
