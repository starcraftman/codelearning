import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    console.log('Fetching cart');
    dispatch(fetchCartData(cart));
  }, []);

  useEffect(() => {
    console.log("UseEffect", isInitial);
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && <Notification {...notification} />}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>

  );
}

export default App;
