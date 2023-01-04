import React, { useState } from 'react';

interface PaymentProps {
  paid: () => void
}

export function Payment({paid}: PaymentProps) {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [bankCard, setBankCard] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardDateError, setCardDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [error, setError] = useState('');


  function submitHandler(event: React.FormEvent) {
    setNameError('');
    setPhoneError('');
    setNameError('');
    setNameError('');
    setNameError('');
    setNameError('');
    setNameError('');

    event.preventDefault();
    const numbers = '1234567890';
    function isNumber(str: string) {
      for (let i = 0; i < str.length; i += 1) {
        if (!numbers.includes(str[i])) {
          return false;
        }
      }
      return true;
    }
    console.log(name);
    console.log(phone);
    console.log(address);

    if (name.trim().split(' ').length < 2 || name.trim().split(' ')[0].length < 3 || name.trim().split(' ')[1].length < 3) {
      setError('Please enter valid name and surname');
      // return;
    }
    if (!phone.startsWith('+') || phone.length < 9 || !isNumber(phone.slice(1))) {
      setError('Please enter valid phone number');
      // return;
    }
    if (address.trim().split(' ').length < 3 || address.trim().split(' ')[0].length < 5 || address.trim().split(' ')[1].length < 5 || address.trim().split(' ')[2].length < 5) {
      setError('Please enter valid address');
      return;
    }
    if (!email.includes('@') || !email.includes('.') || email.startsWith('@') || email.lastIndexOf('.') < email.lastIndexOf('@')) {
      setError('Please enter valid email');
      return;
    }
    if (bankCard.length !== 16 || !isNumber(bankCard)) {
      setError('Please enter valid card number');
      return;
    }
    if (cvv.length !== 3 || !isNumber(cvv)) {
      setError('Please enter valid cvv');
      return;
    }
    
    paid();
  }

  function nameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function phoneHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }
  function addressHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }
  function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function bankCardHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setBankCard(event.target.value);
  }
  function cardDateHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCardDate(event.target.value);
  }
  function cvvHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCvv(event.target.value);
  }

  return (
    <>
    <form  className='flex flex-col' onSubmit={submitHandler}>
      <input className='border py-2 px-4 mb-2' onChange={ nameHandler } type='text' placeholder='enter name and surname'name='nameSurname' value = { name }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ phoneHandler } type='tel' placeholder='+00000000000' name='mobilePhone' value = { phone }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ addressHandler } type='text' placeholder='Enter your address' name='address' value = { address }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ emailHandler } type='email' placeholder='example@example.com' name='email' value = { email }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ bankCardHandler } type='number' name='bankCard' value = { bankCard }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ cardDateHandler } type='number' name='cardDate' value = { cardDate }></input>
      {error && <p>{ error }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ cvvHandler } type='number' name='cvv' value = { cvv }></input>
      {error && <p>{ error }</p>}
      <button type='submit' className='btn-submit py-2 px-4 border bg-yellow-300'>Submit</button>
    </form>
    </>
  )
}