// import { useState } from 'react';

// export function PaginationInCart({ productsPerPage, totalProducts }) {
//   const [page, setPage] = useState(1);
//   const allPages = Math.ceil(totalProducts / productsPerPage);
//   const lastIndex = page * productsPerPage;
//   const firstIndex = lastIndex - productsPerPage;

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * productsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };
// }
