import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
// import { ModalWindowContext } from "../Context/ModalWindowContext";

export function clearCart() {

  // const { afterPaymentWindow } = useContext(ModalWindowContext);
  const { listOfProd, removeEpmDisc, removeRsDisc, delFromCart } = useContext(CartContext);
    
    while (listOfProd.length > 0) {
      delFromCart(listOfProd[listOfProd.length -1]);
    }
    removeEpmDisc();
    removeRsDisc();
  }