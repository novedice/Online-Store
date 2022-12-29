import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { root } from '..';
import { App, myCart } from '../App';
import { ModalWindowState } from '../Context/ModalWindowContext';
import { ErrorMes } from './errorMessage';
// import { DiscountContext } from '../Context/DiscountContext';

export function DiscountCode() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    // const { RSDiscount, EPMDiscount, applyRS, notApplyRS, applyEPM, notApplyEPM } = useContext(DiscountContext);
    // const [showAddButton, setShowAddButton] = useState(false);

    const submitHandler = async (event: React.FormEvent) => {
      event.preventDefault();
      setError('');
        if (value === 'RS') {
          myCart.rsDiscount = true;
          // applyRS();
          console.log('rs applied', myCart.rsDiscount);
        }
        if (value === 'EPM') {
          myCart.epmDiscount = true;
          // applyEPM();
          console.log('epm applied', myCart.epmDiscount);

        }
        root.render(
                  <BrowserRouter>
                  <ModalWindowState>
                    <App />
                  </ModalWindowState>
                  </BrowserRouter>
                )
      
    //     if (value !== 'EPM') {
    //       setError('Please enter valid discount code');
    //     return
    //     } else {
    //       myCart.totalPay *= 0.9;
    //       root.render(
    //         <BrowserRouter>
    //         <ModalWindowState>
    //           <App />
    //         </ModalWindowState>
    //         </BrowserRouter>
    //       )
    //     }
    //   }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }


    return (
        <form className='flex' onSubmit={submitHandler}>
            <input
            type='text'
            className="border py-2 px-4 mb-2 w-full"
            placeholder="Enter discount code"
            value={value}
            onChange={changeHandler}
            />

            {error && <ErrorMes error = {error} />}
            
            <button type="submit" className="text-base m-0 h-[40px] py-0 px-2 border bg-green-400 hover:bg-red-300">apply</button>
        </form>
    )
}