import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { ModalWindowContext } from '../Context/ModalWindowContext';

export const RedirectToMain = function () {
  const { redirectionOff } = useContext(ModalWindowContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  navigate('/');
  redirectionOff();
  clearCart();
};
