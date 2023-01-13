import React, { useContext, useState } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { DiscountCode } from '../components/DiscountCode';
import { CartContext } from '../Context/CartContext';
import { AfterPayment } from '../components/AfterPayment';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/products';
import { PaginationInCart } from '../components/Pagination';
import { styleAllBtn, styleBtnSubmit } from '../styleClassNames/styleConstants';

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
  const [itemsPerPage, setItemsPerPage] = useState<number>(2);

  const handlerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
  };

  if (loading) {
    return <div>loading...</div>;
  } else if (listOfProd && listOfProd.length !== 0) {
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
                }, 4500);
                setTimeout(() => {
                  redirectionOn();
                }, 4400);
              }}
            />
          </ModalWindow>
        )}
        {redirection && navigate('/')}
        <div className="Cart-container flex min-h-[600px] justify-between px-2 py-4 text-xl">
          <div className="basic-3/5 w-[100%] border pt-4 pl-2 pr-2">
            <div className="flex justify-between">
              <p>
                My bag ({listOfProd ? listOfProd.length : 0}{' '}
                {listOfProd && listOfProd.length > 1 ? 'items' : 'item'})
              </p>
              <div className="mr-4 flex">
                <p className="mr-2">Items per page </p>
                <select
                  defaultValue={2}
                  onChange={handlerPageChange}
                  className="border"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
            <div className="item-container mx-auto flex max-w-2xl flex-col justify-around pt-5">
              {productsInCart ? (
                <PaginationInCart productsPerPage={itemsPerPage} />
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
                    <div className="mb-4 flex">
                      <p className="mr-4">Applied code RS - 10%</p>
                      <button
                        className={`rounded text-sm ${styleAllBtn}`}
                        onClick={() => removeRsDisc()}
                      >
                        DROP
                      </button>
                    </div>
                    <div className="mb-4 flex">
                      <p className="mr-4">Applied code EPM - 10%</p>
                      <button
                        className={`rounded text-sm ${styleAllBtn}`}
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
                        className={`rounded text-sm ${styleAllBtn}`}
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
                      className={`rounded text-sm ${styleAllBtn}`}
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
                className={`${styleBtnSubmit} ${styleAllBtn}`}
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
