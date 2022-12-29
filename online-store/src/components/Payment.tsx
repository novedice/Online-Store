import React, { useState } from 'react';

interface PaymentProps {
  paid: () => void
}

export function Payment({paid}: PaymentProps) {

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function submitHandler(event: React.FormEvent) {
    setError('');
    event.preventDefault();
    
    if (name.trim().length <= 6) {
      setError('Please enter valid name and surname');
      return;
    }
    paid();
  }

  function nameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    
  }

  return (
    <>
    <form onSubmit={submitHandler}>
      {error && <p>{error}</p>}
      <input className='border py-2 px-4 mb-2' onChange={nameHandler} type='text' placeholder='enter name and surname'name='nameSurname' value = { name }></input>
      <input className='border py-2 px-4 mb-2' type='number' placeholder='+00000000000' name='mobilePhone'></input>
      <input className='border py-2 px-4 mb-2' type='text' placeholder='Enter your address' name='address'></input>
      <input className='border py-2 px-4 mb-2' type='email' placeholder='example@example.com' name='email'></input>
      <input className='border py-2 px-4 mb-2' type='number' name='bankCard'></input>
      <input className='border py-2 px-4 mb-2' type='number' name='cardDate'></input>
      <input className='border py-2 px-4 mb-2' type='number' name='cvv'></input>
      <button type='submit' className='btn-submit py-2 px-4 border bg-yellow-300'>Submit</button>
    </form>
    </>
  )
}