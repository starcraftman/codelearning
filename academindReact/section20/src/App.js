import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

const fireUrl = "https://react-http-51865-default-rtdb.firebaseio.com/cart.json"
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCart = async () => {
      if (isInitial) {
        isInitial = false;
        return;
      }
      dispatch(uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data."
      }))
      const resp = await fetch(fireUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cart)
      })
      if (!resp.ok) {
        throw new Error("Failed to send");
      }
      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Cart data transmitted to db."
      }))

      setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000)
    }
  
  sendCart()
    .catch(error => {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!"
      })) 
    })

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
