import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

interface AfterPaymentProps {
  paidSuccess: () => void;
}

export function AfterPayment({ paidSuccess }: AfterPaymentProps) {
  const [sec, setSec] = useState(5);

  setTimeout(() => setSec(sec - 1), 1000);
  paidSuccess();
  // const navigate = useNavigate();

  return (
    <>
      <div>
        <p className="text-center">
          Your order was successfully paid. Thank you for your order!
        </p>
        <p className="text-center">
          You will be redirect to the main page in 0{sec} seconds
        </p>
      </div>
      {/* { {redirection && navigate('/')}} */}
    </>
  );
}
