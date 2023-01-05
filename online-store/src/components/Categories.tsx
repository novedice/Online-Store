// import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constans/constans';

export function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickCategory = (category: string) => {
    const categories = searchParams.get('categories');
    const categoriesArray = categories?.split(',') || [];

    console.log(categoriesArray);
    console.log(categories);

    if (categoriesArray.includes(category)) {
      const newCategories = categoriesArray.filter((el) => el != category);

      if (!newCategories.length) {
        setSearchParams({});
      } else {
        setSearchParams({ categories: newCategories.join(',') });
      }
    } else {
      const newCategories = [...categoriesArray, category];
      if (!newCategories.length) {
        setSearchParams({});
      } else {
        setSearchParams({ categories: newCategories.join(',') });
      }
    }
  };

  // const handleClick = (event: any) => {
  //   const selectedCategory = event.target;
  //   // const query = button
  //   setSearchParams({categories})
  // };

  return (
    <div className="Categories w- 1/4">
      <ul>
        {CATEGORIES.map((category, i) => {
          return (
            <>
              <button
                className="ml-2 mt-2 w-32 border px-2"
                onClick={() => onClickCategory(category)}
                key={i}
              >
                {category}
              </button>
              <br />
            </>
          );
        })}
      </ul>
    </div>
  );
}
