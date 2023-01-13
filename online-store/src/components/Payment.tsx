import React, { useState } from 'react';
import '../assets/ae.jpeg';
import '../assets/visa.jpeg';
import '../assets/mastercard.jpeg';
import '../assets/jcb.jpeg';
import {
  styleAllBtn,
  styleBtnSubmit,
  styleContainerInput,
  styleErrorMes,
  styleInput,
  styleLabel,
  styleText,
} from '../styleClassNames/styleConstants';

interface PaymentProps {
  paid: () => void;
}

export function Payment({ paid }: PaymentProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankCard, setBankCard] = useState<string>('');
  const [cardDate, setCardDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [cardError, setCardError] = useState<string>('');
  const [cardDateError, setCardDateError] = useState<string>('');
  const [cvvError, setCvvError] = useState<string>('');
  const [paymentSystem, setPaymentSystem] = useState<string>('jcb.jpeg');

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

    if (
      name.trim().split(' ').length < 2 ||
      name.trim().split(' ')[0].length < 3 ||
      name.trim().split(' ')[1].length < 3 ||
      isNumber(name.trim().split(' ')[0]) ||
      isNumber(name.trim().split(' ')[1])
    ) {
      setNameError('Please enter valid name and surname');
      err += 1;
    }

    if (
      !phone.startsWith('+') ||
      phone.length < 9 ||
      !isNumber(phone.slice(1))
    ) {
      setPhoneError('Please enter valid phone number');
      err += 1;
    }

    if (
      address.trim().split(' ').length < 3 ||
      address.trim().split(' ')[0].length < 5 ||
      address.trim().split(' ')[1].length < 5 ||
      address.trim().split(' ')[2].length < 5
    ) {
      setAddressError('Please enter valid address');
      err += 1;
    }

    if (
      !email.includes('@') ||
      !email.includes('.') ||
      email.startsWith('@') ||
      email.lastIndexOf('.') < email.lastIndexOf('@')
    ) {
      setEmailError('Please enter valid email');
      err += 1;
    }

    if (bankCard.length !== 16 || !isNumber(bankCard)) {
      setCardError('Please enter valid card number');
      err += 1;
    }

    if (
      cardDate.length !== 5 ||
      !isNumber(cardDate.slice(0, 2)) ||
      !isNumber(cardDate.slice(3)) ||
      +cardDate.slice(0, 2) > 12
    ) {
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

      return event.target.value.slice(0, 16);
    });
  }

  function cardDateHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCardDate((prev) => {
      if (
        prev.length > event.target.value.length &&
        event.target.value[event.target.value.length - 1] === '/'
      ) {
        return event.target.value.slice(0, 2);
      }
      if (
        event.target.value.length === 2 &&
        !event.target.value.includes('/')
      ) {
        return `${event.target.value.slice(0, 2)}/`;
      } else {
        return event.target.value;
      }
    });
  }

  function cvvHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCvv(event.target.value.slice(0, 3));
  }

  return (
    <>
      <form
        className="ml-auto mr-auto flex w-full max-w-lg flex-col p-4"
        onSubmit={submitHandler}
      >
        <div className="-mx-3 mb-6 flex flex-wrap">
          <div className={styleContainerInput}>
            <label
              className={`${styleLabel} ${styleText}`}
              htmlFor="nameSurname"
            >
              Please enter your full name and surname
            </label>
            <input
              className={`mb-3 w-full ${styleInput}`}
              onChange={nameHandler}
              type="text"
              placeholder="John Black"
              name="nameSurname"
              value={name}
            ></input>
            {nameError && <p className={styleErrorMes}>{nameError}</p>}
          </div>
          <div className={styleContainerInput}>
            <label
              className={`${styleLabel} ${styleText}`}
              htmlFor="mobilePhone"
            >
              Please enter your phone number
            </label>
            <input
              className={`mb-3 w-full ${styleInput}`}
              onChange={phoneHandler}
              type="tel"
              placeholder="+0000000000"
              name="mobilePhone"
              value={phone}
            ></input>
            {phoneError && <p className={styleErrorMes}>{phoneError}</p>}
          </div>
          <div className={styleContainerInput}>
            <label className={`${styleLabel} ${styleText}`} htmlFor="address">
              Please enter your address
            </label>
            <input
              className={`mb-3 w-full ${styleInput}`}
              onChange={addressHandler}
              type="text"
              placeholder="Spain Corruna Ferrol "
              name="address"
              value={address}
            ></input>
            {addressError && <p className={styleErrorMes}>{addressError}</p>}
          </div>
          <div className={styleContainerInput}>
            <label className={`${styleLabel} ${styleText}`} htmlFor="email">
              Please enter your email address
            </label>
            <input
              className={`w-full ${styleInput}`}
              onChange={emailHandler}
              type="email"
              placeholder="example@example.com"
              name="email"
              value={email}
            ></input>
            {emailError && <p className={styleErrorMes}>{emailError}</p>}
          </div>
          <div className="w-full p-3 px-3">
            <p className={`${styleLabel} ${styleText}`}>
              Please enter your card details
            </p>
            <div className="-mx-3 mb-6 flex w-[300px] flex-col flex-wrap rounded border-2 p-3">
              <div className="flex">
                <img
                  className="mr-2 w-[20%] rounded border"
                  src={paymentSystem}
                ></img>
                <input
                  className={styleInput}
                  onChange={bankCardHandler}
                  type="number"
                  placeholder="1234567812345678"
                  name="bankCard"
                  value={bankCard}
                ></input>
              </div>
              <div className="flex">
                <div className="m-3">
                  <p>valid until</p>
                  <input
                    className={`w-24 ${styleInput}`}
                    onChange={cardDateHandler}
                    type="text"
                    name="cardDate"
                    value={cardDate}
                  ></input>
                </div>
                <div className="m-3">
                  <p>CVV</p>
                  <input
                    className={`w-24 ${styleInput}`}
                    onChange={cvvHandler}
                    type="number"
                    name="cvv"
                    value={cvv}
                  ></input>
                </div>
              </div>
              {cardError && <p className={styleErrorMes}>{cardError}</p>}
              {cardDateError && (
                <p className={styleErrorMes}>{cardDateError}</p>
              )}
              {cvvError && <p className={styleErrorMes}>{cvvError}</p>}
            </div>
          </div>
          <button
            type="submit"
            className={`btn-submit text-l w-[100%] ${styleAllBtn} ${styleBtnSubmit}`}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
}
