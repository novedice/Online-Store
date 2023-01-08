import React from 'react';

import { Categories } from '../components/Categories';
import { ShowProduct } from '../components/ShowProduct';
import { useProducts } from '../hooks/products';
import { useSearchParams } from 'react-router-dom';
import { BRANDS, CATEGORIES } from '../constans/constans';
import { SearchProduct } from '../components/SearchProduct';
import { Brands } from '../components/Brands';
import { IProduct } from '../types/types';
// import { SearchParams } from "../components/SearchParams";

export function ShopPage() {
  const { allProd, loading, error } = useProducts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get('categories') || CATEGORIES.join(',');
  const brands = searchParams.get('brands') || BRANDS.join(',');

  const searchQuery = searchParams.get('search') || '';

  const categoriesArray = categories.split(',') || [];
  const brandsArray = brands.split(',') || [];

  // console.log(getCategoriesArray);
  // console.log(searchQuery);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const serachQuery = searchParams.get('search') || '';
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const query = form.search.value;
  //   setSearchParams({ search: query });
  // };
  const filterProducts = () => {
    let filteredProducts: IProduct[] = allProd;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        `${product.title},${product.category},${product.description},${product.price},${product.discountPercentage},${product.rating},${product.stock},${product.brand},${product.thumbnail}`
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

    return filteredProducts;
  };

  return (
    <div className="w-auto">
      <Categories />
      <Brands />
      <SearchProduct />
      {/* <form onSubmit={handleSubmit} className="pl-2">
        <input type="search" name="search" className="border pl-2" />
        <input type="submit" product="Search" className="border pl-2" />
      </form> */}
      <div className="container mx-auto flex w-3/4 flex-wrap pt-5">
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {filterProducts().map((product) => (
          <ShowProduct product={product} key={product.id} />
        ))}

        {/* filter((elem) => elem.props.product.category === "smartphones") */}
      </div>
    </div>
  );
}
