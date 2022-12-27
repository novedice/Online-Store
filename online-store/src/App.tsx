import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Basket } from './components/Basket';
import { Navigation } from './components/Navigation';
import { BasketPage } from './pages/BasketPage';
import { ShopPage } from './pages/ShopPage';

export const myBasket = new Basket([], [], 0, 0);

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <ShopPage /> }/>
        <Route path="/basket" element={ <BasketPage /> }/>
      </Routes>
    </>
  );
}

