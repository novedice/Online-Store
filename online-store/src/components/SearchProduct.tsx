import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchFilters } from '../hooks/SearchFilters';

export function SearchProduct() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { updateSearchParams } = useSearchFilters();

  const handleChange = (event: any) => {
    const value = event.target.value;
    updateSearchParams('search', value);
  };

  return (
    <input
      onChange={handleChange}
      value={searchQuery}
      type="search"
      name="search"
      className="m-2 border pl-2"
    />
  );
}
