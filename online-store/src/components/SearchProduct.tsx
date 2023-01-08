import React from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useSearchFilters } from '../hooks/SearchFilters';

export function SearchProduct() {
  const { updateSearchParams } = useSearchFilters();

  const handleChange = (event: any) => {
    //тип
    const value = event.target.value;
    updateSearchParams('search', value);
  };

  return (
    <input
      onChange={handleChange}
      type="search"
      name="search"
      className="m-2 border pl-2"
    />
  );
}
