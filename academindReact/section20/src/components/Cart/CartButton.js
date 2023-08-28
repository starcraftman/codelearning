import { useDispatch } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const clickCartHandler = () => {
    dispatch(uiActions.toggle());
  }
  const cartTotalQuantity = cartItems.reduce((accu, item) => accu + item.quantity, 0);

  return (
    <button onClick={clickCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotalQuantity}</span>
    </button>
  );
};

export default CartButton;
