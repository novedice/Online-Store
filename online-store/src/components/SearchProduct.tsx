import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function SearchProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const serachQuery: string = searchParams.get('search') || '';
  const handleSubmit = (event: any) => {
    // event.preventDefault();
    const form = event.target;
    const query = form.value;
    setSearchParams({ search: query });
  };

  return (
    // // <form onSubmit={handleSubmit} className="pl-2">
    //   // <input type="search" name="search" className="border pl-2" />
    //   {/* <input type="submit" value="Search" className="border pl-2" />
    // </form> */}

    <input
      onChange={handleSubmit}
      type="search"
      name="search"
      className="m-2 border pl-2"
    />
  );
}
