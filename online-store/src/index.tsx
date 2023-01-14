import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ModalWindowState } from './Context/ModalWindowContext';
import { BrowserRouter } from 'react-router-dom';
import { CartState } from './Context/CartContext';

export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename="/">
    <CartState>
      <ModalWindowState>
        <App />
      </ModalWindowState>
    </CartState>
  </BrowserRouter>
);
