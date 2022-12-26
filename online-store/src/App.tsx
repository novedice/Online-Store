import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation';
// import { ShowProduct } from './components/product';
import { BasketPage } from './pages/BasketPage';
import { ShopPage } from './pages/ShopPage';
import { ItemInBasket } from './types/types';
// import { allProducts } from './data/products'

export const basket: ItemInBasket[] = [];
export const basketList: string[] = [];

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

