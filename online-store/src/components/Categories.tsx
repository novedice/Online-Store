import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../constans/constans";

export function Categories() {

  const [searchParams, setSearchParams] = useSearchParams();

 
  const onClickCategory = (category:string) => {
    const  categories = searchParams.get('categories');
    const categoriesArray = categories?.split(',') || [];

    console.log(categoriesArray);
    
    
    if (categoriesArray.includes(category)) {
      const newCategories = categoriesArray.filter((el) => el != categories);
      if (!newCategories.length) {
        setSearchParams({});
      } else {
        setSearchParams({categories:unescape(newCategories.join(','))});
      }
      
    } else {
      const newCategories = [...categoriesArray, category]
      if (!newCategories.length) {
        setSearchParams({});
      }
      else {
        setSearchParams({categories:unescape(newCategories.join(','))});
      }
    }


    
  }

//   const categories = ['Smartphones', 'Laptop', 'Fraqrances', 'Skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting']
  

  return (
    <div className="Categories w- 1/4">
      <ul>
        {CATEGORIES.map((category, i) => { 
          return (
          <li onClick={() => onClickCategory(category)}  key = {i}> 
          {/* className = { activeIndex === i ? 'bg-green-600 cursor-pointer w-32' : 'cursor-pointer w-10'} */}
          {category}
          </li>
          )
        })}
      </ul>
    </div>
  )
}