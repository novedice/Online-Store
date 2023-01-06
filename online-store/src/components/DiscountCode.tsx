import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { ErrorMes } from './errorMessage';

export function DiscountCode() {
  const { rsDiscount, epmDiscount, addRsDisc, addEpmDisc } =
    useContext(CartContext);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (value === 'RS') {
      addRsDisc();
      console.log('rs applied', rsDiscount);
    }
    if (value === 'EPM') {
      addEpmDisc();
      console.log('epm applied', epmDiscount);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className="flex" onSubmit={submitHandler}>
      <input
        type="text"
        className="mb-2 w-full border py-2 px-4"
        placeholder="Enter discount code"
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMes error={error} />}

      <button
        type="submit"
        className="btn-submit flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
      >
        apply
      </button>
    </form>
  );
}
