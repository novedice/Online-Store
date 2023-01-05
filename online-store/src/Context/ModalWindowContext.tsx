/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";

interface IModalWindowContext {
  modalWindow: boolean;
  open: () => void;
  close: () => void;
  afterPaymentWindow: boolean;
  openAfterPayment: () => void;
  closeAfterPayment: () => void;
  productWindow: boolean;
  openProductWindow: () => void;
  closeProductWindow: () => void;
}

export const ModalWindowContext = createContext<IModalWindowContext>({
  modalWindow: false,
  open: () => {},
  close: () => {},
  afterPaymentWindow: false,
  openAfterPayment: () => {},
  closeAfterPayment: () => {},
  productWindow: false,
  openProductWindow: () => {},
  closeProductWindow: () => {},
});

export const ModalWindowState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalWindow, setModalWindow] = useState(false);
  const open = () => setModalWindow(true);
  const close = () => setModalWindow(false);
  const [afterPaymentWindow, setAfterPaymentWindow] = useState(false);
  const openAfterPayment = () => setAfterPaymentWindow(true);
  const closeAfterPayment = () => setAfterPaymentWindow(false);
  const [productWindow, setProductWindow] = useState(false);
  const openProductWindow = () => setProductWindow(true);
  const closeProductWindow = () => setProductWindow(false);

  return (
    <ModalWindowContext.Provider value={{ modalWindow, open, close, afterPaymentWindow, openAfterPayment, closeAfterPayment, productWindow, openProductWindow, closeProductWindow }}>
      {children}
    </ModalWindowContext.Provider>
  );
};
