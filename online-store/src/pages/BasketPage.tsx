import React, { useContext } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { basket } from '../App';
import { ShowItem } from '../components/ItemInBasket';

export function BasketPage() {
    // const [modalWindow, setModalWindow] = useState(false);
const {modalWindow, close } = useContext(ModalWindowContext);

    return (
        <>
        {modalWindow && <ModalWindow title='Please enter your data'>
            <Payment paid={ function (): void {
                    close()
                } } />
        </ModalWindow>}
          <div className='container flex flex-col mx-auto max-w-2xl pt-5'>
          { basket.map((product, index) => <ShowItem product={ product } key = {index} />) }
          </div>
        </>
    )
}