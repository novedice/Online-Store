import ReactSlider from 'react-slider';
import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

function Slider() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1749);
  //   const [searchParams, setSearchParams] = useSearchParams();

  //   const filterActive = searchParams.get('minPrice') !== null;
  //   console.log(filterActive);

  //   //   const onApplyFilter = () => {
  //   //     searchParams.set('minPrice', `${values[0]}`);
  //   //     searchParams.set('maxPrice', `${values[1]}`);
  //   setSearchParams(searchParams, {
  //     replace: true,
  //   });
  //   };

  return (
    <div className="container-slider">
      <ReactSlider
        defaultValue={[min, max]}
        className="slider"
        trackClassName="tracker"
        min={10}
        max={1749}
        minDistance={50}
        step={1}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => {
          return <div {...props} className="thumb"></div>;
        }}
        renderTrack={(props) => {
          return <div {...props} className="track"></div>;
        }}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onChange={([min, max]) => {
          setMin(min);
          setMax(max);
        }}
      />
      <div className="values-wrapper">
        <p>
          Min:
          <span> €{min}</span>
        </p>
        <p>
          Max:
          <span> €{max}</span>
        </p>
      </div>
    </div>
  );
}

export default Slider;
