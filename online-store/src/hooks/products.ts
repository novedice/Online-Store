import { useState, useEffect } from "react";
import { IProduct } from "../types/types";
import axios, { AxiosError } from "axios";

interface IData {
  limit: number
  products: IProduct[]
  skip: number
  total: number
}

export function useProducts() {
  const [allProd, setAllProd] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchProducts() {
    try {
      setError('');
      setLoading(true);

      const response = await axios.get<IData>('https://dummyjson.com/products?limit=35');
      console.log(response);
  
      setAllProd(response.data.products);
  
      setLoading(false);

    } catch(e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {allProd, loading, error}
}