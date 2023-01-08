import { BRANDS } from '../constans/constans';
import { useSearchFilters } from '../hooks/SearchFilters';

export function Brands() {
  const { toggleSearchParams } = useSearchFilters();

  const onClickBrand = (brand: string) => {
    toggleSearchParams('brands', brand);
  };
  console.log('Impression of Acqua Di Gio'.toLowerCase());
  return (
    <div className="Brands m-2 w-44 border p-3">
      {BRANDS.map((brand, index) => {
        return (
          <>
            <button
              className="ml-2 mt-2 w-32 border px-2 hover:bg-red-200"
              onClick={() => onClickBrand(brand)}
              key={index}
            >
              {brand}
            </button>
            <br />
          </>
        );
      })}
    </div>
  );
}
