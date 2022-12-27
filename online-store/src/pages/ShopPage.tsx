import React from 'react';
import { ShowProduct } from '../components/ShowProduct';
import { useProducts } from '../hooks/products'
// import { allProducts } from '../data/products';
// import axios, { AxiosError } from 'axios';
// import { IProduct } from '../types/types';
// import { IProduct } from '../types/types';

export function ShopPage() {

const {allProd, loading, error} = useProducts(); 

  return (
      <>
        <div className='container flex flex-col mx-auto max-w-2xl pt-5'>
          {error && <p>{ error }</p>}
          {loading && <p>Loading...</p>}
          { allProd.map(product => <ShowProduct product={ product } key = {product.id} />) }
        </div>
      </>
  )
}