import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ErrorMes from './errorMessage';
// import { ErrorMes } from './errorMessage';

export function DiscountCode() {
  const { addRsDisc, addEpmDisc } = useContext(CartContext);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (value === 'RS') {
      addRsDisc();
    }
    if (value === 'EPM') {
      addEpmDisc();
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

        {error && <ErrorMes error={error} />}

        <button
          type="submit"
          className="btn-submit max-h-8 flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 text-sm text-white  hover:border-teal-700 hover:bg-teal-700"
        >
          APPLY
        </button>
      </form>
      <p className="mb-5 text-sm">Discount codes for tests: RS, EPM</p>
    </>
  );
}
