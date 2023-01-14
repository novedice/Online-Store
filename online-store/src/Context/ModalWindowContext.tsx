import React, { createContext, useState } from 'react';

interface IModalWindowContext {
  modalWindow: boolean;
  open: () => void;
  close: () => void;
  afterPaymentWindow: boolean;
  openAfterPayment: () => void;
  closeAfterPayment: () => void;
  redirection: boolean;
  redirectionOn: () => void;
  redirectionOff: () => void;
}

export const ModalWindowContext = createContext<IModalWindowContext>({
  modalWindow: false,
  open: () => {},
  close: () => {},
  afterPaymentWindow: false,
  openAfterPayment: () => {},
  closeAfterPayment: () => {},
  redirection: false,
  redirectionOn: () => {},
  redirectionOff: () => {},
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
  const [redirection, setRedirection] = useState(false);
  const redirectionOn = () => setRedirection(true);
  const redirectionOff = () => setRedirection(false);

  return (
    <ModalWindowContext.Provider
      value={{
        modalWindow,
        open,
        close,
        afterPaymentWindow,
        openAfterPayment,
        closeAfterPayment,
        redirection,
        redirectionOff,
        redirectionOn,
      }}
    >
      {children}
    </ModalWindowContext.Provider>
  );
};
