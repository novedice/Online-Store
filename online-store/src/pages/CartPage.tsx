import React, { useContext } from 'react';
import { ModalWindow } from '../components/ModalWindow';
import { Payment } from '../components/Payment';
import { ModalWindowContext } from '../Context/ModalWindowContext';
import { ShowItem } from '../components/ShowItemInCart';
import { DiscountCode } from '../components/DiscountCode';
import { CartContext } from '../Context/CartContext';
import { allProducts } from '../hooks/products';

export function CartPage() {

  const {modalWindow, open, close } = useContext(ModalWindowContext);
  const { rsDiscount, epmDiscount, listOfProd, productsInCart } = useContext(CartContext);

    return (
        <>
          {modalWindow && <ModalWindow title='Please enter your data' toClose={()=>{close()}}>
            <Payment paid={ function (): void {
                    close()
                } } />
          </ModalWindow>}
          <div className='Cart-container flex px-2 py-4 border justify-between'>
            <div className='basic-3/5 border w-[100%]'>
              <p>
                My bag ({ listOfProd.length } items)
              </p>
              <div className='item-container flex flex-col mx-auto max-w-2xl pt-5 border justify-around'>
                { productsInCart.map((item, index) => <ShowItem item ={ item } key = {index} />) }
              </div>
            </div>
            <div className='basic-2/5 w-[100%] flex flex-col items-center'>
              <div className='border px-2 py-4 w-[100%] hover:cursor-pointer'>
                <p>Discount code</p>
                <DiscountCode />
              </div>
              <div className='border w-[100%]'>
                <p>Summary</p>
                { rsDiscount ? 
                (epmDiscount ? 
                <div>
                  <p>Applied code RS - 10%</p>
                  <p>Applied code EPM - 10%</p>
                  <p className='line-through'>Total: { allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0).toFixed(2) }€</p>
                  <p>Total: { (allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0) * 0.8).toFixed(2) }€</p>
                </div> :
                <div>
                  <p>Applied code RS - 10%</p>
                  <p className='line-through'>Total: { allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0).toFixed(2) }€</p>
                  <p>Total: { (allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0) * 0.9).toFixed(2) }€</p>
                </div>
                ) :
                (epmDiscount ? 
                  <div>
                  <p>Applied code EPM - 10%</p>
                  <p className='line-through'>Total: { allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0).toFixed(2) }€</p>
                  <p>Total: { (allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0) * 0.9).toFixed(2) }€</p>
                </div> :
                <div>Total: { allProducts.filter(product => listOfProd.includes(product.id)).reduce((acc , curVal) => acc + curVal.price * productsInCart[listOfProd.indexOf(curVal.id)].quantity, 0).toFixed(2) }€</div>
                )
                }
              </div>
              <div className='border w-[100%]'>
                <button className='btn-checkout border rounded flex items-center px-2 py-2' onClick={() => {open()}}>CHECKOUT</button>
              </div>
            </div>
          </div>
        </>
    )
}
