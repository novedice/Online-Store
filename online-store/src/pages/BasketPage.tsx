import React, { useContext } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { myBasket } from '../App';
import { ShowItem } from '../components/ItemInBasket';

export function BasketPage() {

    const {modalWindow, open, close } = useContext(ModalWindowContext);

    return (
        <>
          {modalWindow && <ModalWindow title='Please enter your data' toClose={()=>{close()}}>
            <Payment paid={ function (): void {
                    close()
                } } />
          </ModalWindow>}
          <div className='basket-container flex px-2 py-4 border justify-between'>
            <div className='basic-3/5 border w-[100%]'>
              <p>
                My bag ({ myBasket.summaryItems } items)
              </p>
              <div className='item-container flex flex-col mx-auto max-w-2xl pt-5 border justify-around'>
                { myBasket.productsInBasket.map((item, index) => <ShowItem item ={ item } key = {index} />) }
              </div>
            </div>
            <div className='basic-2/5 w-[100%] flex flex-col items-center'>
              <div className='border px-2 py-4 w-[100%]'>Discount code?</div>
              <div className='border w-[100%]'>
                <p>Summary</p>
                <p>Total: {myBasket.totalPay}€</p>
              </div>
              <div className='border w-[100%]'>
                <button className='btn-checkout border rounded flex items-center px-2 py-2' onClick={() => {open()}}>CHECKOUT</button>
              </div>
            </div>
          </div>
        </>
    )
}