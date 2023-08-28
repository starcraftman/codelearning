import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const inCartItems = useSelector((state) => state.cart.items);
  const cartItems = inCartItems.map((item) => {
    const compledtedItem = { ...item, total: item.price * item.quantity }
    return <CartItem key={compledtedItem.id} item={compledtedItem} />
})
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {inCartItems.length !== 0 ? cartItems : <h4>No items in cart.</h4>}
      </ul>
    </Card>
  );
};

export default Cart;
