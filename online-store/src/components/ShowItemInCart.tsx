import React from 'react';
import { ItemInCart } from '../types/types';
import { App, myCart } from '../App';
import { root } from '..';
// import { CartPage } from '../pages/CartPage';
// import { Navigation } from './Navigation'
// import { InCartContext } from '../Context/InCartContext';
import { BrowserRouter } from 'react-router-dom';
import { ModalWindowState } from '../Context/ModalWindowContext';


interface ItemProps {
  item: ItemInCart
}

export function ShowItem({item}: ItemProps) {

  // const [qty, setQty] = useState(item.quantity);
  // const [oldSum, setOldSum] = useState();
  // const [sum, setSum] = useState();

// const { removeFrom } = useContext(InCartContext);

  return (
    <>
      <div className='item-in-Cart border px-2 py-2 rounded flex items-center space-btw'>
          <img src={item.product.thumbnail} className="image-in-Cart basic-1/5 w-1/6 mb-1 px-1 py-1" alt={item.product.title}></img>
          <div className='item-description basis-2/5 flex flex-col px-2 py-4'>
            <p className='font-bold'>{item.product.title}</p>
            <p className=''>Category: {item.product.category}</p>
            <p className=''>Price: {item.product.price}€</p>
          </div>
          <div className='basic-2/5 flex flex-col'>
            <div className='in-stock'><p>in stock: <span>{ item.product.stock }</span></p></div>
            <div className='item-qty flex'>
              <p>Qty: </p>
              <button 
                  className='plus-one border rounded-full px-2 py-0 text-2xl'
                  onClick={() => {
                    if (item.quantity === 1) {
                      myCart.removeFromCart(item.product);
                    } else {
                      myCart.minusOneMore(item.product);
                      // setQty(item.quantity);
                    }
                    root.render(
                      <BrowserRouter>
                      <ModalWindowState>
                        <App />
                      </ModalWindowState>
                      </BrowserRouter>
                    )

                  }}> - </button>
              <span> { item.quantity } </span>
              <button 
                  className='minus-one border rounded-full px-2 py-0 text-2xl'
                  onClick={() => {
                    console.log('+1');
                    myCart.addOneMore(item.product);
                    // setQty(item.quantity);
                    root.render(
                      <BrowserRouter>
                      <ModalWindowState>
                          <App />
                      </ModalWindowState>
                      </BrowserRouter>
                    )

                    //TODO: fix bug with quantity after remove item 


                    }}> + </button>
            </div>
            <p className=''>Discount: {item.product.discountPercentage}%</p>
            <p className=''>
              <span className='line-through mr-4'>{((item.product.price * (1 + item.product.discountPercentage / 100)) * item.quantity).toFixed(2)}€</span>
              <span className='text-red-900'>{(item.product.price) * item.quantity}€</span>
            </p>
            <p className='underline hover:text-blue-800 hover:cursor-pointer' 
              onClick={() => {
              console.log('remove');
              myCart.removeFromCart(item.product)
              root.render(
                <BrowserRouter>
                <ModalWindowState>
                    <App />
                </ModalWindowState>
                </BrowserRouter>
              )
              }}>remove item from Cart</p>
          </div>
      </div>
    </>
  )
}
