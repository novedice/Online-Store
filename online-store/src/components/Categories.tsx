import { CATEGORIES } from '../constans/constans';
import { useSearchFilters } from '../hooks/SearchFilters';
import { useSearchParams } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export function Categories() {
  const { toggleSearchParams } = useSearchFilters();

  const onClickCategory = (category: string) => {
    toggleSearchParams('categories', category);
  };

  const [searchParams] = useSearchParams();
  const categories = searchParams.get('categories');

  const hasCategories = (params: string) => {
    if (categories !== null) {
      return categories.includes(params);
    }
    return false;
  };

  return (
    <>
      <h2 className="categories-header border text-center font-bold">
        Category
      </h2>
      <div className="categories m-2 border p-3 ">
        {CATEGORIES.map((category) => {
          return (
            <li key={category} className="pv2 list-none">
              <div className="flex items-center">
                <Checkbox.Root
                  id={category}
                  name={category}
                  // disabled={false}
                  onCheckedChange={() => onClickCategory(category)}
                  checked={hasCategories(category)}
                  className="checkbox lh-solid pa0 w125 h125 br2 bn flex items-center justify-center bg-white"
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="checkbox__icon w125 h125" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor={category} className="ml3 fw5 f5 cursor-pointer">
                  {category}
                </label>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}
