import React, { createContext, useState } from "react";

interface IInCartContext {
    inCart: boolean
    addIn: () => void
    removeFrom: () => void
}

export const InCartContext = createContext<IInCartContext>({
    inCart: false,
    addIn: () => {},
    removeFrom: () => {}
})

export const InCartState = ({ children }: { children: React.ReactNode}) => {
    const [inCart, setInCart] = useState(false);

    const addIn = () => {
      console.log('inCart in funcAdd', inCart);
      setInCart(true);
      console.log('inCart in funcAdd after', inCart);

    };
    const removeFrom = () => setInCart(false);

    return (
       <InCartContext.Provider value={ {inCart, addIn, removeFrom} }>
        { children }
       </InCartContext.Provider> 
    )
}