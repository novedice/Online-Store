import { Categories } from '../components/Categories';
import { ShowProduct } from '../components/ShowProduct';
import { useProducts } from '../hooks/products';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import { SearchProduct } from '../components/SearchProduct';
import { Brands } from '../components/Brands';
import { IProduct } from '../types/types';
import { VIEW } from '../types/enums';
import Select from '../components/Select';
import PriceFilterContainer from '../components/PriceFilter';
import RatingFilterContainer from '../components/RatingFilter';
import { CopyUrlButton } from '../components/CopyUrlButton';

export function ShopPage() {
  const [view, setView] = useState<VIEW>(VIEW.Block);

  const { allProd, loading, error } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get('categories');
  const categoriesArray = categories?.split(',') || [];
  const brands = searchParams.get('brands');
  const brandsArray = brands?.split(',') || [];
  const searchQuery = searchParams.get('search') || '';
  const sortProduct = searchParams.get('sort') || '';

  const maxPrice = 1750;
  const priceProduct = [
    parseInt(searchParams.get('minPrice') ?? '0'),
    parseInt(searchParams.get('maxPrice') ?? `${maxPrice}`),
  ];

  const maxRating = 5;
  const ratingProduct = [
    parseFloat(searchParams.get('minRating') ?? '0'),
    parseFloat(searchParams.get('maxRating') ?? `${maxRating}`),
  ];

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
    if (priceProduct) {
      const min = priceProduct[0];
      const max = priceProduct[1];
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }
    if (ratingProduct) {
      const min = ratingProduct[0];
      const max = ratingProduct[1];
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= min && product.rating <= max
      );
    }
    return filteredProducts;
  };

  const currentProdArray = filterProducts();

  return (
    <div className="flex flex-col pt-2">
      <div className="filter-header flex h-10 items-center justify-between">
        <div>
          <button
            className="mr-3 ml-2 w-36 rounded border bg-red-300 px-2 pt-1 pb-1 hover:bg-red-400"
            onClick={() => setSearchParams('')}
          >
            Reset Filter
          </button>
          <CopyUrlButton />
        </div>
        <p className="ml-20 font-bold">
          Total found: {currentProdArray.length} product
        </p>
        <div>
          <button
            onClick={() => setView(VIEW.Block)}
            className={
              view === 'block'
                ? 'mr-3 ml-2 w-36 rounded border bg-green-300 px-2 pt-1 pb-1'
                : 'mr-3 ml-2 w-36 rounded border bg-slate-300 px-2 pt-1 pb-1 hover:bg-slate-400'
            }
          >
            Block
          </button>

          <button
            onClick={() => setView(VIEW.List)}
            className={
              view === 'list'
                ? 'mr-3 ml-2 w-36 rounded border bg-green-300 px-2 pt-1 pb-1'
                : 'mr-3 ml-2 w-36 rounded border bg-slate-300 px-2 pt-1 pb-1 hover:bg-slate-400'
            }
          >
            List
          </button>
        </div>
      </div>
      <div className="content-container flex">
        <div className="allfilters flex flex-col">
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
          <PriceFilterContainer maxPrice={maxPrice} />
          <RatingFilterContainer maxRating={maxRating} />
        </div>
        <div
          className={`container mx-auto flex w-5/6 flex-wrap items-center pt-5 ${
            view === 'list' ? 'flex-col' : ''
          }`}
        >
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          {filterProducts().map((product) => (
            <ShowProduct product={product} key={product.id} view={view} />
          ))}
        </div>
      </div>
    </div>
  );
}
