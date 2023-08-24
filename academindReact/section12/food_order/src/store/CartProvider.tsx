import React from "react";

import CartContext from "./cart-context";
import { CartItemType } from "../components/Cart/Cart";

interface PropsType {
  children: string | number | React.ReactNode | React.ReactNode[];
}

interface ActionType {
  type: string;
  item?: CartItemType;
  id?: string;
}
const defaultCart = {
  items: [] as CartItemType[],
  totalAmount: 0,
};
const cartReducer = (state: typeof defaultCart, action: ActionType) => {
  if (action.type === "ADD") {
    const actItem = action.item!;
    const updatedItems = state.items.concat(actItem);
    const updatedAmount = state.totalAmount + actItem.price;
    return {
        items: updatedItems,
        totalAmount: updatedAmount
    }
  } else if (action.type === "REMOVE") {
  }
  return defaultCart;
};

const CartProvider = (props: PropsType) => {
  const [cartState, cartDispatch] = React.useReducer(cartReducer, defaultCart);
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item: CartItemType) => {
      cartDispatch({
        type: "ADD",
        item: item,
      });
    },
    removeItem: (id: string) => {
      cartDispatch({
        type: "REMOVE",
        id: id,
      });
    },
    getNumItems: () => {
      return cartState.items.reduce((accu, item) => accu + item.amount, 0);
    },
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
