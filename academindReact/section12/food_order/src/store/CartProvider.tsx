import React from "react";

import CartContext from "./cart-context";
import { CartItemType } from "../components/Cart/Cart";
import { formatMoney } from "../util";

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
    const updatedAmount = state.totalAmount + actItem.price;
    const existingCartItem = state.items.find((item) => item.id === actItem.id);
    const existingCartItemIndex = state.items.findIndex(item => item.id ===actItem.id);
    let updatedItems: CartItemType[] = [];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + actItem.amount,
      };
      updatedItems = [
        ...state.items
      ];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(actItem);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };

  } else if (action.type === "REMOVE") {
    const existingCartItem = state.items.find((item) => item.id === action.id);

    if (existingCartItem) {
      const updatedAmount = state.totalAmount - existingCartItem.price;
      const otherItems = state.items.filter((item) => item.id !== existingCartItem.id)
      let updatedItems;
      if (existingCartItem.amount > 1) {
        updatedItems = [
          ...otherItems,
          {...existingCartItem, amount: existingCartItem.amount - 1}
        ]
      } else {
        updatedItems =  otherItems;
      }
      return {
        items: updatedItems,
        totalAmount: updatedAmount
      }
    }
  }

  return defaultCart;
};

const CartProvider = (props: PropsType) => {
  const [cartState, cartDispatch] = React.useReducer(cartReducer, defaultCart);
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item: CartItemType) => {
      console.log("addItem", item);
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
    getTotal: () => {
      return formatMoney(cartState.totalAmount);
    },
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
