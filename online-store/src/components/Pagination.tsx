import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ReactPaginate from 'react-paginate';
import { ShowItem } from './ShowItemInCart';

interface IPaginationInCart {
  productsPerPage: number;
}

export function PaginationInCart({ productsPerPage }: IPaginationInCart) {
  const { productsInCart } = useContext(CartContext);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(productsInCart.length / productsPerPage);
  const lastIndex = page + productsPerPage;
  // const firstIndex = lastIndex - productsPerPage;
  const curList = productsInCart.slice(page, lastIndex);

  const handlePageClick = (event: { selected: number }) => {
    console.log('select:', event.selected);
    console.log('prodInCart', productsInCart);
    console.log(`curlist${event.selected}`, curList);
    const newPage = (event.selected * productsPerPage) % productsInCart.length;
    setPage(newPage);
  };

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
        {curList &&
          curList.map((item, index) => (
            <ShowItem item={item} page={page} key={index} />
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
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previuous"
        hrefBuilder={(
          pageIndex: number,
          pageCount: number,
          selectedPage: number
        ) =>
          (pageIndex = page) >= 0 && selectedPage <= pageCount
            ? `/page/${selectedPage}`
            : '#'
        }
        hrefAllControls={true}
        renderOnZeroPageCount={undefined}
      ></ReactPaginate>
    </>
  );
}
