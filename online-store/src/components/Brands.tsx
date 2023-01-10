import { BRANDS } from '../constans/constans';
import { useSearchFilters } from '../hooks/SearchFilters';
import { useSearchParams } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export function Brands() {
  const { toggleSearchParams } = useSearchFilters();
  const [searchParams] = useSearchParams();
  const brands = searchParams.get('brands');

  const onClickBrand = (brand: string) => {
    toggleSearchParams('brands', brand);
  };

  const hasBrands = (params: string) => {
    if (brands !== null) {
      return brands.includes(params);
    }
    return false;
  };

  return (
    <div className="brands m-2 border p-3 ">
      {BRANDS.map((brand) => {
        return (
          <li key={brand} className="pv2 list-none">
            <div className="flex items-center">
              <Checkbox.Root
                id={brand}
                name={brand}
                // disabled={false}
                onCheckedChange={() => onClickBrand(brand)}
                checked={hasBrands(brand)}
                className="checkbox lh-solid pa0 w125 h125 br2 bn flex items-center justify-center bg-white"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="checkbox__icon w125 h125" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={brand} className="ml3 fw5 f5 cursor-pointer">
                {brand}
              </label>
            </div>
          </li>
        );
      })}
    </div>
  );
}
