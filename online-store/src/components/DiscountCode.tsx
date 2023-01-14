import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { styleAllBtn, styleErrorMes } from '../styleClassNames/styleConstants';

export function DiscountCode() {
  const { addRsDisc, addEpmDisc } = useContext(CartContext);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (value === 'RS') {
      addRsDisc();
    } else if (value === 'EPM') {
      addEpmDisc();
    } else {
      setError(`sorry, we cannot find code ${value}`);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <form className="mb-3 flex" onSubmit={submitHandler}>
        <input
          type="text"
          className="mb-2 mr-2 box-border max-h-8 w-[80%] border py-2 px-4"
          placeholder="Enter discount code"
          value={value}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className={`btn-submit box-border max-h-8 rounded ${styleAllBtn}`}
        >
          APPLY
        </button>
      </form>
      {error && <p className={`${styleErrorMes}`}>{error}</p>}
      <p className="mb-5 text-sm">Discount codes for tests: RS, EPM</p>
    </>
  );
}
