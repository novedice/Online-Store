import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import ErrorMes from './errorMessage';
// import { ErrorMes } from './errorMessage';

export function DiscountCode() {

  const { rsDiscount, epmDiscount, addRsDisc, addEpmDisc } = useContext(CartContext);
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
    }

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
        className="m-0 h-[40px] border bg-green-400 py-0 px-2 text-base hover:bg-red-300"
      >
        apply
      </button>
    </form>
  );
}
