import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { CartContext } from './Context/CartContext';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ShopPage } from './pages/ShopPage';

export function App() {
  const { listOfProd, resorteCart } = useContext(CartContext);

  if (listOfProd.length === 0 && localStorage.getItem('listOfProd') !== null) {
    useEffect(() => resorteCart(), []);
  }

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/cart/:page" element={<CartPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
    </>
  );
}
