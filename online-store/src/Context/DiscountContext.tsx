/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";

interface IDiscount {
    RSDiscount: boolean
    EPMDiscount: boolean
    applyRS: () => void
    applyEPM: () => void
    notApplyRS: () => void
    notApplyEPM: () => void
}

export const DiscountContext = createContext<IDiscount>({
    RSDiscount: false,
    EPMDiscount: false,
    applyRS: () => {},
    applyEPM: () => {},
    notApplyRS: () => {},
    notApplyEPM: () => {}
})

export const DiscountState = ({ children }: { children: React.ReactNode}) => {
    const [RSDiscount, setRSDiscount] = useState(false);
    const [EPMDiscount, setEPMDiscount] = useState(false);

    const applyRS = () => setRSDiscount(true);

    const notApplyRS = () => setRSDiscount(false);

    const applyEPM = () => setEPMDiscount(true);

    const notApplyEPM = () => setEPMDiscount(false);

    return (
       <DiscountContext.Provider value={ {RSDiscount, EPMDiscount, applyRS, notApplyRS, applyEPM, notApplyEPM} }>
        { children }
       </DiscountContext.Provider> 
    )
}