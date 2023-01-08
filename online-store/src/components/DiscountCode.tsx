import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { ErrorMes } from './errorMessage';

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
    <form className="flex" onSubmit={submitHandler}>
      <input
        type="text"
        className="mb-2 box-border max-h-8 w-full border py-2 px-4"
        placeholder="Enter discount code"
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMes error={error} />}

      <button
        type="submit"
        className="btn-submit max-h-8 flex-shrink-0 rounded border-4 border-gray-500 bg-gray-500 text-sm text-white hover:border-gray-700 hover:bg-gray-700"
      >
        APPLY
      </button>
    </form>
  );
}
