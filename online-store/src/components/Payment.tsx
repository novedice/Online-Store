import React, { useState } from "react";

interface PaymentProps {
  paid: () => void;
}

export function Payment({paid}: PaymentProps) {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [bankCard, setBankCard] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardDateError, setCardDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  function submitHandler(event: React.FormEvent) {

    const numbers = '1234567890';
    let err = 0;

    setNameError('');
    setPhoneError('');
    setAddressError('');
    setEmailError('');
    setCardError('');
    setCardDateError('');
    setCvvError('');

    event.preventDefault();

    function isNumber(str: string) {
      for (let i = 0; i < str.length; i += 1) {
        if (!numbers.includes(str[i])) {
          return false;
        }
      }
      return true;
    }

    if (name.trim().split(' ').length < 2 || name.trim().split(' ')[0].length < 3 || name.trim().split(' ')[1].length < 3) {
      setNameError('Please enter valid name and surname');
      err += 1;
    }
    if (!phone.startsWith('+') || phone.length < 9 || !isNumber(phone.slice(1))) {
      setPhoneError('Please enter valid phone number');
      err += 1;
    }
    if (address.trim().split(' ').length < 3 || address.trim().split(' ')[0].length < 5 || address.trim().split(' ')[1].length < 5 || address.trim().split(' ')[2].length < 5) {
      setAddressError('Please enter valid address');
      err += 1;
    }
    if (!email.includes('@') || !email.includes('.') || email.startsWith('@') || email.lastIndexOf('.') < email.lastIndexOf('@')) {
      setEmailError('Please enter valid email');
      err += 1;
    }
    if (bankCard.length !== 16 || !isNumber(bankCard)) {
      setCardError('Please enter valid card number');
      err += 1;
    }
    if (cardMonth.length !== 2) {
      setCardDateError('Please enter valid card date');
      err += 1;
    }
    if (cardYear.length !== 2) {
      setCardDateError('Please enter valid card date');
      err += 1;
    }
    if (cvv.length !== 3 || !isNumber(cvv)) {
      setCvvError('Please enter valid cvv');
      err += 1;
    }

    if (err > 0) {
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
  function cardMonthHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCardMonth(event.target.value);
  }
  function cardYearHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCardYear(event.target.value);
  }
  function cvvHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCvv(event.target.value);
  }

  return (
    <>
    <form  className='flex flex-col' onSubmit={submitHandler}>
      {nameError && <p className="text-red-400 text-xs">{ nameError }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ nameHandler } type='text' placeholder='enter name and surname'name='nameSurname' value = { name }></input>
      {phoneError && <p className="text-red-400 text-xs">{ phoneError }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ phoneHandler } type='tel' placeholder='+00000000000' name='mobilePhone' value = { phone }></input>
      {addressError && <p className="text-red-400 text-xs">{ addressError }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ addressHandler } type='text' placeholder='Enter your address' name='address' value = { address }></input>
      {emailError && <p className="text-red-400 text-xs">{ emailError }</p>}
      <input className='border py-2 px-4 mb-2' onChange={ emailHandler } type='email' placeholder='example@example.com' name='email' value = { email }></input>
      <div className="border rounded mb-2 flex flex-col">
        <input className='border py-2 px-4 mb-2' onChange={ bankCardHandler } type='number' name='bankCard' value = { bankCard }></input>
        <div>
        <input className='border py-2 px-4 mb-2' onChange={ cardMonthHandler } type='number' name='cardMonth' min = '1' max = '12' value = { cardMonth}></input>
        <span>/</span>
        <input className='border py-2 px-4 mb-2' onChange={ cardYearHandler } type='number' name='cardYear' min='23' max='99' value = { cardYear }></input>
        </div>
        <input className='border py-2 px-4 mb-2' onChange={ cvvHandler } type='number' name='cvv' value = { cvv }></input>
        {cardError && <p className="text-red-400 text-xs">{ cardError }</p>}
        {cardDateError && <p className="text-red-400 text-xs">{ cardDateError }</p>}
        {cvvError && <p className="text-red-400 text-xs">{ cvvError }</p>}
      </div>
      <button type='submit' className='btn-submit py-2 px-4 border bg-yellow-300'>Submit</button>
    </form>
    </>
  );
}
