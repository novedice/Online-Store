import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
// import { Cart } from './components/ShopCart';
import { Navigation } from './components/Navigation';
import { CartContext } from './Context/CartContext';
import { takeDataFromStorage } from './functions/dataFromLocalStorage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ShopPage } from './pages/ShopPage';

// export const myCart = new Cart([], [], 0, 0);

export function App() {
  const { listOfProd } = useContext(CartContext);

  if (listOfProd.length === 0 && localStorage.getItem('listOfProd') !== null) {
    takeDataFromStorage();
  }
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
    </>
  );
}
