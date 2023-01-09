import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollapsibleList from './CollapsibleList';
import FilterToggle from './FilterToggle';

function PriceFilter({ maxPrice }: { maxPrice: number }) {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //   const [searchParams, setSearch] = useSearchParams();
  const defaultValues = [
    parseInt(searchParams.get('minPrice') ?? '0'),
    parseInt(searchParams.get('maxPrice') ?? `${maxPrice}`),
  ];
  const [values, setValues] = useState(defaultValues);
  const filterActive = searchParams.get('minPrice') !== null;
  const onApplyFilter = () => {
    searchParams.set('minPrice', `${values[0]}`);
    searchParams.set('maxPrice', `${values[1]}`);
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  return (
    <CollapsibleList
      title="Price"
      actionButton={
        <FilterToggle
          visible={visible}
          active={filterActive}
          onApply={onApplyFilter}
          onClear={() => {
            searchParams.delete('minPrice');
            searchParams.delete('maxPrice');
            // clear local state
            setValues([0, maxPrice]);

            // clear url state
            setSearchParams(searchParams, {
              replace: true,
            });
          }}
        />
      }
    >
      <li>
        <div className="mv2">
          <div className="flex">
            <div className="flex-auto">
              <div className="mb2 fw5 flex justify-center">
                ${values[0]} - ${values[1]}
              </div>
              <Slider.Root
                // eslint-disable-next-line @typescript-eslint/no-shadow
                onValueChange={(values) => {
                  setValues([values[0], values[1]]);
                  setVisible(true);
                }}
                className="slider relative flex items-center"
                value={values}
                min={0}
                max={maxPrice}
                step={50}
                minStepsBetweenThumbs={1}
              >
                <Slider.Track className="slider__track bg-moon-gray relative flex-auto">
                  <Slider.Range className="slider__range bg-light-purple" />
                </Slider.Track>
                <Slider.Thumb className="slider__thumb db w1 h1 br-100 bg-white" />
                <Slider.Thumb className="slider__thumb db w1 h1 br-100 bg-white" />
              </Slider.Root>
            </div>
          </div>
        </div>
      </li>
    </CollapsibleList>
  );
}

export default function PriceFilterContainer({
  maxPrice,
}: {
  maxPrice: number;
}) {
  if (maxPrice === 0) return null;

  return <PriceFilter maxPrice={maxPrice} />;
}
