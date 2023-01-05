import React, { useState } from "react";
import '../assets/ae.jpeg';
import '../assets/visa.jpeg';
import '../assets/mastercard.jpeg';
import '../assets/jcb.jpeg';

interface PaymentProps {
  paid: () => void;
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
  const [paymentSystem, setPaymentSystem] = useState('jcb.jpeg');

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
    if (cardDate.length !== 5 || !isNumber(cardDate.slice(0,2)) || !isNumber(cardDate.slice(3))) {
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
    
    setBankCard(() => {

      if (event.target.value[0] === '4') {
        setPaymentSystem('visa.jpeg');
      } else if (event.target.value[0] === '5') {
        setPaymentSystem('mastercard.jpeg');
      } else if (event.target.value[0] === '1') {
        setPaymentSystem('ae.jpeg');
      } else {
        setPaymentSystem('jcb.jpeg');
      }

      return event.target.value;
    });
  }
  function cardDateHandler(event: React.ChangeEvent<HTMLInputElement>) {

    setCardDate((prev) => {

      if (prev.length > event.target.value.length && event.target.value[event.target.value.length - 1] === '/') {
        return event.target.value.slice(0,2);
      }

      if (event.target.value.length === 2 && !event.target.value.includes('/')) {
        return `${event.target.value.slice(0,2)}/`;
      } else {
        return event.target.value;
      }

    });
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
        <div className="flex">
        <img className="w-[7%] mr-2 border rounded" src={ paymentSystem }></img>
        <input className='border py-2 px-4 mb-2 w-[89%]' onChange={ bankCardHandler } type='number' name='bankCard' value = { bankCard }></input>
        </div>
        <input className='border py-2 px-4 mb-2' onChange={ cardDateHandler } type='text' name='cardDate' value = { cardDate}></input>
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
