import { createSelector } from "reselect";

export const selectCartData = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartData],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (quantity, cartItem) =>
      quantity + cartItem.quantity * cartItem.productPrice,
    0
  )
);
