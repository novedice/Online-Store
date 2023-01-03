import React, { useContext } from "react";
import { ModalWindow } from "../components/ModalWindow";
import { Payment } from "../components/Payment";
import { ModalWindowContext } from "../Context/ModalWindowContext";
import { myCart } from "../App";
import { ShowItem } from "../components/ShowItemInCart";
import { DiscountCode } from "../components/DiscountCode";
// import { DiscountContext } from '../Context/DiscountContext';
// import { render } from '@testing-library/react';
// import { InCartContext } from '../Context/InCartContext';

export function CartPage() {
  const { modalWindow, open, close } = useContext(ModalWindowContext);
  // const { RSDiscount, EPMDiscount, applyRS, notApplyRS, applyEPM, notApplyEPM } = useContext(DiscountContext);

  return (
    <>
      {modalWindow && (
        <ModalWindow
          title="Please enter your data"
          toClose={() => {
            close();
          }}
        >
          <Payment
            paid={function (): void {
              close();
            }}
          />
        </ModalWindow>
      )}
      <div className="Cart-container flex justify-between border px-2 py-4">
        <div className="basic-3/5 w-[100%] border">
          <p>My bag ({myCart.summaryItems} items)</p>
          <div className="item-container mx-auto flex max-w-2xl flex-col justify-around border pt-5">
            {myCart.productsInCart.map((item, index) => (
              <ShowItem item={item} key={index} />
            ))}
          </div>
        </div>
        <div className="basic-2/5 flex w-[100%] flex-col items-center">
          <div className="w-[100%] border px-2 py-4 hover:cursor-pointer">
            <p>Discount code</p>
            <DiscountCode />
          </div>
          <div className="w-[100%] border">
            <p>Summary</p>
            {myCart.rsDiscount ? (
              myCart.epmDiscount ? (
                <div>
                  <p>Applied code RS - 10%</p>
                  <p>Applied code EPM - 10%</p>
                  <p className="line-through">Total: {myCart.totalPay}€</p>
                  <p>Total: {myCart.totalPay * 0.8}€</p>
                </div>
              ) : (
                <div>
                  <p>Applied code RS - 10%</p>
                  <p className="line-through">Total: {myCart.totalPay}€</p>
                  <p>Total: {myCart.totalPay * 0.9}€</p>
                </div>
              )
            ) : myCart.epmDiscount ? (
              <div>
                <p>Applied code EPM - 10%</p>
                <p className="line-through">Total: {myCart.totalPay}€</p>
                <p>Total: {myCart.totalPay * 0.9}€</p>
              </div>
            ) : (
              <div>Total: {myCart.totalPay}€</div>
            )}
          </div>
          <div className="w-[100%] border">
            <button
              className="btn-checkout flex items-center rounded border px-2 py-2"
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
}
