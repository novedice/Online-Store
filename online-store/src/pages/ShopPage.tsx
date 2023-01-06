import React from 'react';

import { Categories } from '../components/Categories';
import { ShowProduct } from '../components/ShowProduct';
import { useProducts } from '../hooks/products';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constans/constans';
import { SearchProduct } from '../components/SearchProduct';
// import { SearchParams } from "../components/SearchParams";

export function ShopPage() {
  const { allProd, loading, error } = useProducts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const getCategories = searchParams.get('categories') || CATEGORIES.join(',');
  const serachQuery = searchParams.get('search') || '';

  const getCategoriesArray = getCategories.split(',') || [];
  console.log(getCategoriesArray);
  console.log(serachQuery);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const serachQuery = searchParams.get('search') || '';
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const query = form.search.value;
  //   setSearchParams({ search: query });
  // };

  return (
    <div className="w-auto">
      <Categories />
      <SearchProduct />
      {/* <form onSubmit={handleSubmit} className="pl-2">
        <input type="search" name="search" className="border pl-2" />
        <input type="submit" value="Search" className="border pl-2" />
      </form> */}
      <div className="container mx-auto flex w-3/4 flex-wrap pt-5">
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {allProd
          .filter((f) => f.title.toLowerCase().includes(serachQuery))
          // .filter((f) => f.category.includes(categories))
          .filter((f) => {
            if (getCategoriesArray.length === 0) {
              return true;
            }

            return getCategoriesArray.includes(f.category);
          })
          // .filter((f) => getCategoriesArray.includes(f.category))
          .map((product) => (
            <ShowProduct product={product} key={product.id} />
          ))}

        {/* filter((elem) => elem.props.product.category === "smartphones") */}
      </div>
    </div>
  );
}
