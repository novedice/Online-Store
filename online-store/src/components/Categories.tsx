import React, { useState } from "react";

// interface ICategiries {
//   categories:string;
// }



export function Categories() {

  const [activeIndex, setActiveIndex] = useState(0)

  const onClickCategory = (index:number) => {
    setActiveIndex(index);
  }

//   const categories = ['Smartphones', 'Laptop', 'Fraqrances', 'Skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting']
  const categories = ['Smartphones', 'Laptop', 'Fraqrances', 'Skincare']

  return (
    <div className="Categories w- 1/4">
      <ul>
        {categories.map((value, i) => { 
          return (
          <li onClick={() => onClickCategory(i)} className = { activeIndex === i ? 'bg-green-600 cursor-pointer w-32' : 'cursor-pointer w-10'} key = {i}>
          {value}
          </li>
          )
        })}
      </ul> 
    </div>
  )
}