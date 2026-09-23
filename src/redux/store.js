import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"


export const store =configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishlistReducer,
    },
});

store.subscribe(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.items)
  );

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(store.getState().wishlist.items)
  );
});