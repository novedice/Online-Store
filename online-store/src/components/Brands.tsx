import { BRANDS } from '../constans/constans';
import { useSearchFilters } from '../hooks/SearchFilters';

export function Brands() {
  const { toggleSearchParams } = useSearchFilters();

  const onClickBrand = (brand: string) => {
    toggleSearchParams('brands', brand);
  };

  return (
    <div className="Brands m-2 w-44 border p-3">
      {BRANDS.map((brand) => {
        return (
          <button
            className="ml-2 mt-2 w-32 border px-2 hover:bg-red-200"
            onClick={() => onClickBrand(brand)}
            key={brand}
          >
            {brand}
          </button>
        );
      })}
    </div>
  );
}
