import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "./../hooks/useAuthContext";

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    loadItems(state, action) {
      const items = action.payload;
      state.items = [...items];
      state.totalQuantity = state.items.length;
      let totalPrice = 0;
      state.items.forEach((item) => (totalPrice += item.totalPrice));
      state.totalPrice = totalPrice;
    },
    emptyCart(state, action) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const fetchCart = (user) => async (dispatch) => {
  const { uid } = user;

  console.log(uid);
  // console.log("userid: ", user.uid);
  const unsub = onSnapshot(doc(db, "users", uid), (currentUser) => {
    // console.log("currentUserr", currentUser.data().cart);
    const userCart = currentUser.data().cart;
    console.log("userCart: ", userCart);
    // const cartItems = [];
    // console.log(cartItems);
    // userCart &&
    //   userCart.forEach((item) => {
    //     cartItems.push(item);
    //   });
    userCart && dispatch(loadItems(userCart));
  });

  return () => unsub();
};

export const { loadItems, emptyCart } = cart.actions;
export default cart;
