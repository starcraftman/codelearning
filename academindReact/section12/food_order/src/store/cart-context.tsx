import React from "react";

import { CartItemType } from "../components/Cart/Cart";

const DEFAULT_CONTEXT = {
  items: [] as CartItemType[],
  totalAmount: 0,
  addItem: (item: CartItemType): void => {
    throw new Error("Default context should not be used.");
  },
  removeItem: (id: string): void => {
    throw new Error("Default context should not be used.");
  },
  clearCart: (): void => {
    throw new Error("Default context should not be used.");
  },
  getNumItems: (): number => {
    throw new Error("Default context should not be used.");
  },
  getTotal: (): string => {
    throw new Error("Default context should not be used.");
  },
};
const CartContext = React.createContext(DEFAULT_CONTEXT);

export default CartContext;
