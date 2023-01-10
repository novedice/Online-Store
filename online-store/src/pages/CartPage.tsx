import React, { useContext } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { ShowItem } from '../components/ShowItemInCart';
import { DiscountCode } from '../components/DiscountCode';
import { CartContext } from '../Context/CartContext';
// import { allProducts } from '../hooks/products';
import { AfterPayment } from '../components/AfterPayment';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/products';

export function CartPage() {
  const { allProd, loading } = useProducts();

  const {
    modalWindow,
    open,
    close,
    afterPaymentWindow,
    openAfterPayment,
    closeAfterPayment,
    redirectionOn,
    redirection,
  } = useContext(ModalWindowContext);

  const {
    rsDiscount,
    epmDiscount,
    listOfProd,
    productsInCart,
    clearCart,
    removeEpmDisc,
    removeRsDisc,
  } = useContext(CartContext);

  const navigate = useNavigate();
  if (loading) {
    return <div>loading...</div>;
  } else if (
    listOfProd &&
    listOfProd.length !== 0
    // localStorage.getItem('listOfProd') === null
  ) {
    return (
      <>
        {modalWindow && (
          <ModalWindow
            title=""
            toClose={() => {
              close();
            }}
          >
            <Payment
              paid={function (): void {
                close();
                openAfterPayment();
              }}
            />
          </ModalWindow>
        )}
        {afterPaymentWindow && (
          <ModalWindow
            title=""
            toClose={() => {
              closeAfterPayment();
            }}
          >
            <AfterPayment
              paidSuccess={() => {
                setTimeout(() => {
                  closeAfterPayment();
                  clearCart();
                  // redirectionOn();
                }, 4500);
                setTimeout(() => {
                  redirectionOn();
                }, 4400);
                // const navigate = useNavigate();
                // navigate('/');
              }}
            />
          </ModalWindow>
        )}
        {redirection && navigate('/')}
        <div className="Cart-container flex min-h-[600px] justify-between border px-2 py-4 text-xl">
          <div className="basic-3/5 w-[100%] border">
            <p>My bag ({listOfProd ? listOfProd.length : 0} items)</p>
            <div className="item-container mx-auto flex max-w-2xl flex-col justify-around border pt-5">
              {productsInCart ? (
                productsInCart.map((item, index) => (
                  <ShowItem item={item} key={index} />
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          </div>
          <div className="basic-2/5 flex w-[100%] flex-col items-center pl-[1%]">
            <div className="w-[100%] border px-2 py-4 hover:cursor-pointer">
              <p>Discount code</p>
              <DiscountCode />
            </div>
            <div className="mb-4 w-[100%] border">
              <p>Summary</p>
              {rsDiscount ? (
                epmDiscount ? (
                  <div>
                    <div className="flex">
                      <p className="mr-4">Applied code RS - 10%</p>
                      <button
                        className="
                      flex-shrink-0
                      rounded
                      border-4
                      border-teal-500
                      bg-teal-500
                      text-sm
                      text-white
                      hover:border-teal-700
                      hover:bg-teal-700"
                        onClick={() => removeRsDisc()}
                      >
                        DROP
                      </button>
                    </div>
                    <div className="flex">
                      <p className="mr-4">Applied code EPM - 10%</p>
                      <button
                        className="
                      flex-shrink-0
                      rounded
                      border-4
                      border-teal-500
                      bg-teal-500
                      text-sm
                      text-white
                      hover:border-teal-700
                      hover:bg-teal-700"
                        onClick={() => removeEpmDisc()}
                      >
                        DROP
                      </button>
                    </div>
                    <p className="line-through">
                      Total:{' '}
                      {allProd
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
                    </p>
                    <p>
                      Total:{' '}
                      {(
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
                      ).toFixed(2)}
                      €
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex">
                      <p className="mr-4">Applied code RS - 10%</p>
                      <button
                        className="
                      flex-shrink-0
                      rounded
                      border-4
                      border-teal-500
                      bg-teal-500
                      text-sm
                      text-white
                      hover:border-teal-700
                      hover:bg-teal-700"
                        onClick={() => removeRsDisc()}
                      >
                        DROP
                      </button>
                    </div>
                    <p className="line-through">
                      Total:{' '}
                      {allProd
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
                    </p>
                    <p>
                      Total:{' '}
                      {(
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
                      ).toFixed(2)}
                      €
                    </p>
                  </div>
                )
              ) : epmDiscount ? (
                <div>
                  <div className="flex">
                    <p className="mr-4">Applied code EPM - 10%</p>
                    <button
                      className="
                      flex-shrink-0
                      rounded
                      border-4
                      border-teal-500
                      bg-teal-500
                      text-sm
                      text-white
                      hover:border-teal-700
                      hover:bg-teal-700"
                      onClick={() => removeEpmDisc()}
                    >
                      DROP
                    </button>
                  </div>
                  <p className="line-through">
                    Total:{' '}
                    {allProd
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
                  </p>
                  <p>
                    Total:{' '}
                    {(
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
                    ).toFixed(2)}
                    €
                  </p>
                </div>
              ) : (
                <div>
                  Total:{' '}
                  {allProd
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
                </div>
              )}
            </div>
            <div className="w-[100%]flex items-center border">
              <button
                className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
                onClick={() => {
                  open();
                }}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex min-h-[600px] flex-col items-center justify-center text-xl">
          <p className="text-center">Your Shopcart is empty.</p>
          <p className="text-center">
            Let&#39;s go{' '}
            <Link to={'/'}>
              <span className="underline">shopping !</span>
            </Link>
          </p>
        </div>
      </>
    );
  }
}
