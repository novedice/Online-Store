import { CATEGORIES } from '../constans/constans';
import { useSearchFilters } from '../hooks/SearchFilters';

export function Categories() {
  const { toggleSearchParams } = useSearchFilters();

  const onClickCategory = (category: string) => {
    toggleSearchParams('categories', category);
  };

  return (
    <div className="Categories m-2 border p-3 ">
      {CATEGORIES.map((category) => {
        return (
          <button
            className="ml-2 mt-2 w-32 border px-2 hover:bg-red-200"
            onClick={() => onClickCategory(category)}
            key={category}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
