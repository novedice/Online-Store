import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { IData, IProduct } from '../types/types';

export function useProducts() {
  const [allProd, setAllProd] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchProducts() {
    try {
      setError('');
      setLoading(true);

      const response = await axios.get<IData>(
        'https://dummyjson.com/products?limit=100'
      );

      setAllProd(response.data.products);

      setLoading(false);
    } catch (e: unknown) {
      const err = e as AxiosError;
      setLoading(false);
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { allProd, loading, error };
}
