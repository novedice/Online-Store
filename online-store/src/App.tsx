import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cart } from './components/ShopCart';
import { Navigation } from './components/Navigation';
import { CartPage } from './pages/CartPage';
import { ShopPage } from './pages/ShopPage';

export const myCart = new Cart([], [], 0, 0);

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <ShopPage /> }/>
        <Route path="/cart" element={ <CartPage /> }/>
      </Routes>
    </>
  );
}

