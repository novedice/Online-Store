/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from 'react';

import { Categories } from '../components/Categories';
import { ShowProduct } from '../components/ShowProduct';
import { useProducts } from '../hooks/products';
import { useSearchParams } from 'react-router-dom';

import { SearchProduct } from '../components/SearchProduct';
import { Brands } from '../components/Brands';
import { IProduct } from '../types/types';
import Select from '../components/Select';

export function ShopPage() {
  const { allProd, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get('categories');
  const brands = searchParams.get('brands');

  const searchQuery = searchParams.get('search') || '';

  const categoriesArray = categories?.split(',') || [];
  const brandsArray = brands?.split(',') || [];

  const sortProduct = searchParams.get('sort') || '';

  const filterProducts = () => {
    let filteredProducts: IProduct[] = allProd;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        `${product.title},${product.category},${product.description},
        ${product.price},${product.discountPercentage},${product.rating},
        ${product.stock},${product.brand},${product.thumbnail}`
          .toLowerCase()
          .includes(searchQuery)
      );
    }
    if (brandsArray.length !== 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brandsArray.includes(product.brand.toLowerCase())
      );
    }
    if (categoriesArray.length !== 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoriesArray.includes(product.category.toLowerCase())
      );
    }
    if (sortProduct) {
      filteredProducts.sort((a, b) => {
        const { price, rating } = a;
        const { price: priceB, rating: ratingB } = b;
        if (sortProduct === 'priceDesc') {
          return priceB - price;
        }
        if (sortProduct === 'priceAsc') {
          return price - priceB;
        }
        if (sortProduct === 'ratingDesc') {
          return ratingB - rating;
        }
        if (sortProduct === 'ratingAsc') {
          return rating - ratingB;
        }
        return price - priceB;
      });
    }

    return filteredProducts;
  };

  return (
    <div className="w-auto">
      <Categories />
      <Brands />
      <Select
        selectSort={(e) => {
          searchParams.set('sort', e.target.value);
          setSearchParams(searchParams);
        }}
        label="Sort options"
        name="Sort by"
        options={[
          {
            label: 'Sort by price DESC',
            value: 'priceDesc',
          },
          {
            label: 'Sort by price ASC',
            value: 'priceAsc',
          },
          {
            label: 'Sort by rating DESC',
            value: 'ratingDesc',
          },
          {
            label: 'Sort by rating ASC',
            value: 'ratingAsc',
          },
        ]}
      />
      <SearchProduct />

      <div className="container mx-auto flex w-3/4 flex-wrap pt-5">
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {filterProducts().map((product) => (
          <ShowProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
