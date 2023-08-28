import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
import { FIRE_URL } from "../secrets.private";

let clearNotifs;
export const sendCartData = (cart) => {
  return async (dispatch) => {
    clearTimeout(clearNotifs);
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );

    const sendRequest = async () => {
      const resp = await fetch(FIRE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!resp.ok) {
        throw new Error("Failed to send");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data transmitted to db.",
        })
      );

      clearNotifs = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000);

    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
export const fetchCartData = (cart) => {
    return async (dispatch) => {
      clearTimeout(clearNotifs);
      const fetchCart = async () => {
        const resp = await fetch(FIRE_URL);
        if (!resp.ok) {
          throw new Error("Failed to send");
        }
        return await resp.json();
      };
  
      try {
        const cartData = await fetchCart();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],
        }));        
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      }
    };
  };