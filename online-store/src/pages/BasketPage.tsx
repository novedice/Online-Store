import React, { useContext } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { myBasket } from '../App';
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
          { myBasket.productsInBasket.map((item, index) => <ShowItem item ={ item } key = {index} />) }
        </div>
        </>
    )
}