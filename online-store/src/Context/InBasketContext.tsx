import React, { createContext, useState } from "react";

interface IInBasketContext {
    inBasket: boolean
    addIn: () => void
    removeFrom: () => void
}

export const InBasketContext = createContext<IInBasketContext>({
    inBasket: false,
    addIn: () => {},
    removeFrom: () => {}
})

export const InBasketState = ({ children }: { children: React.ReactNode}) => {
    const [inBasket, setInBasket] = useState(false);

    const addIn = () => {
      console.log('inBasket in funcAdd', inBasket);
      setInBasket(true);
      console.log('inBasket in funcAdd after', inBasket);

    };
    const removeFrom = () => setInBasket(false);

    return (
       <InBasketContext.Provider value={ {inBasket, addIn, removeFrom} }>
        { children }
       </InBasketContext.Provider> 
    )
}