import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CollapsibleList from './CollapsibleList';
import FilterToggle from './FilterToggle';

function RatingFilter({ maxRating }: { maxRating: number }) {
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaulRatingtValues = [
    parseFloat(searchParams.get('minRating') ?? '0'),
    parseFloat(searchParams.get('maxRating') ?? `${maxRating}`),
  ];

  const [ratingValues, setRatingValues] = useState(defaulRatingtValues);
  const ratingFilterActive = searchParams.get('minRating') !== null;
  const onApplyRatingFilter = () => {
    searchParams.set('minRating', `${ratingValues[0]}`);
    searchParams.set('maxRating', `${ratingValues[1]}`);
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  return (
    <CollapsibleList
      title="Rating"
      actionButton={
        <FilterToggle
          visible={visible}
          active={ratingFilterActive}
          onApply={onApplyRatingFilter}
          onClear={() => {
            searchParams.delete('minRating');
            searchParams.delete('maxRating');
            setRatingValues([0, maxRating]);
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
                min {ratingValues[0]} - max {ratingValues[1]}
              </div>
              <Slider.Root
                // eslint-disable-next-line @typescript-eslint/no-shadow
                onValueChange={(ratingValues) => {
                  setRatingValues([ratingValues[0], ratingValues[1]]);
                  setVisible(true);
                }}
                className="slider relative flex items-center"
                value={ratingValues}
                min={0}
                max={maxRating}
                step={0.1}
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

export default function RatingFilterContainer({
  maxRating,
}: {
  maxRating: number;
}) {
  if (maxRating === 0) return null;

  return <RatingFilter maxRating={maxRating} />;
}
