// import React, { useState } from "react";

// interface ICategiries {
//   categories:string;
// }

// export function Categories() {

//   const [activeIndex, setActiveIndex] = useState(0)

//   const onClickCategory = (index) => {
//     setActiveIndex(index);
//   }

//   const categories = ['Smartphones', 'Laptop', 'Fraqrances', 'Skincare', 'groceries', 'home-decoration', 'furniture', 'tops', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'automotive', 'motorcycle', 'lighting']

//   return (
//     <div className="Categories w- 1/4">
//       <ul>
//         {categories.map((value, index) => {
//           <li onClick={() => setActiveIndex(index)} className { activeIndex === 0 ? 'active' : ''}>
//             {value}
//           </li>
//         })}
//       </ul> 
//     </div>
//   )
// }