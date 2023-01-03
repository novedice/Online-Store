import React, { useState } from "react";

interface PaymentProps {
  paid: () => void;
}

export function Payment({ paid }: PaymentProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submitHandler(event: React.FormEvent) {
    setError("");
    event.preventDefault();

    if (name.trim().length <= 6) {
      setError("Please enter valid name and surname");
      return;
    }
    paid();
  }

  function nameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        {error && <p>{error}</p>}
        <input
          className="mb-2 border py-2 px-4"
          onChange={nameHandler}
          type="text"
          placeholder="enter name and surname"
          name="nameSurname"
          value={name}
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="number"
          placeholder="+00000000000"
          name="mobilePhone"
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="text"
          placeholder="Enter your address"
          name="address"
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="email"
          placeholder="example@example.com"
          name="email"
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="number"
          name="bankCard"
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="number"
          name="cardDate"
        ></input>
        <input
          className="mb-2 border py-2 px-4"
          type="number"
          name="cvv"
        ></input>
        <button
          type="submit"
          className="btn-submit border bg-yellow-300 py-2 px-4"
        >
          Submit
        </button>
      </form>
    </>
  );
}
