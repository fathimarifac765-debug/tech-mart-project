import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import ordersReducer from "./ordersSlice";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice";


export const store =configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishlistReducer,
        orders:ordersReducer,
        users:usersReducer,
        products:productsReducer,
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