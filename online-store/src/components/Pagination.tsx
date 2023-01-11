import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ReactPaginate from 'react-paginate';
import { ShowItem } from './ShowItemInCart';
import { useProducts } from '../hooks/products';
import { IProdInCart, IProduct } from '../types/types';
// import { useLocation, useParams, useNavigate } from 'react-router-dom';

interface IPaginationInCart {
  productsPerPage: number;
}

// type QParam = {
//   page: string;
// };

export function PaginationInCart({ productsPerPage }: IPaginationInCart) {
  const { productsInCart, listOfProd } = useContext(CartContext);
  // const { page } = useParams<QParam>();
  const { allProd, loading } = useProducts();
  // const navigate = useNavigate();

  const [curPage, setCurPage] = useState(0);

  const [error, setError] = useState(false);
  const [currentProds, setCurrentProds] = useState<IProduct[]>([]);
  const [allFindedProds, setAllFindedProds] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  // const location = useLocation();

  const lastIndex = curPage + productsPerPage;
  const curList = listOfProd.slice(curPage, lastIndex);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = (event.selected * productsPerPage) % listOfProd.length;
    setCurPage(newPage);
    // location.pathname = `/cart/${newPage}`;
  };

  // const forcePageChange = () => {
  //   return 1;
  // }
  // console.log('location', location);

  // console.log('usePar', page);

  // console.log(navigate);

  useEffect(() => {
    setError(false);
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
  useEffect(() => {
    if (allFindedProds.length && curList) {
      const findCurProd = allFindedProds.filter((prod) =>
        curList.includes(prod.id)
      );
      if (findCurProd) {
        setCurrentProds(findCurProd);
        setTotalPages(Math.ceil(listOfProd.length / productsPerPage));
        // if (curPage > totalPages) {
        //   setCurPage(totalPages - 1);
        // }
      } else {
        setError(true);
      }
    }
  }, [
    curPage,
    allFindedProds.length,
    listOfProd.length,
    productsPerPage,
    totalPages,
  ]);

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
          initialPage={curPage}
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
