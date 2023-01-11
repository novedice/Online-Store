import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ReactPaginate from 'react-paginate';
import { ShowItem } from './ShowItemInCart';
import { useProducts } from '../hooks/products';
import { IProdInCart, IProduct } from '../types/types';

interface IPaginationInCart {
  productsPerPage: number;
}

export function PaginationInCart({ productsPerPage }: IPaginationInCart) {
  const { productsInCart, listOfProd } = useContext(CartContext);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [currentProds, setCurrentProds] = useState<IProduct[]>([]);
  const [allFindedProds, setAllFindedProds] = useState<IProduct[]>([]);

  const totalPages = Math.ceil(listOfProd.length / productsPerPage);
  const lastIndex = page + productsPerPage;
  const curList = listOfProd.slice(page, lastIndex);
  const { allProd, loading } = useProducts();

  const handlePageClick = (event: { selected: number }) => {
    const newPage = (event.selected * productsPerPage) % listOfProd.length;
    setPage(newPage);
  };

  // const forcePageChange = () => {
  //   return 1;
  // }

  useEffect(() => {
    setError(false);
    console.log('allProd', allProd);
    console.log('cl', curList);
    if (allProd.length && listOfProd) {
      const findProducts = allProd.filter((product) =>
        listOfProd.includes(product.id)
      );
      if (findProducts) {
        setAllFindedProds(findProducts);
      } else {
        setError(true);
      }
    }
  }, [allProd.length, listOfProd.length, totalPages]);
  console.log('allProducts', allFindedProds);
  useEffect(() => {
    if (allFindedProds.length && curList) {
      const findCurProd = allFindedProds.filter((prod) =>
        curList.includes(prod.id)
      );
      if (findCurProd) {
        setCurrentProds(findCurProd);
      } else {
        setError(true);
      }
    }
  }, [
    page,
    allFindedProds.length,
    listOfProd.length,
    productsPerPage,
    totalPages,
  ]);
  console.log('curProducts', currentProds);

  if (loading) {
    return <div>loading...</div>;
  } else if (currentProds) {
    return (
      <>
        <div
          className="
        item-container
        mx-auto
        flex
        max-w-2xl
        flex-col
        justify-around
        pt-5"
        >
          {currentProds.map((item, index) => (
            <ShowItem
              item={item}
              itemInCart={
                productsInCart.find(
                  (prod) => prod.id === item.id
                ) as IProdInCart
              }
              key={index}
            />
          ))}
        </div>
        <ReactPaginate
          className="width-[100%] m-3 flex items-center justify-center p-2"
          disabledLinkClassName="m-2 text-gray-700"
          pageClassName="m-2"
          pageLinkClassName="m-2"
          activeClassName="text-teal-700"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previuous"
          // forcePage={page - 1}
          // hrefBuilder={(
          //   pageIndex: number,
          //   pageCount: number,
          //   selectedPage: number
          // ) =>
          //   (pageIndex = page) >= 0 && selectedPage <= pageCount
          //     ? `/page/${selectedPage}`
          //     : '#'
          // }
          // hrefAllControls={true}
          renderOnZeroPageCount={undefined}
        ></ReactPaginate>
      </>
    );
  } else if (error) {
    return (
      <>
        <div className="flex min-h-[600px] flex-col items-center justify-center text-3xl">
          <p className="text-center">PAGE NOT FOUND (404)</p>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
