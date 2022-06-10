import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartTotalPrice: 0,
  },
  reducers: {
    loadItems(state, action) {
      const items = action.payload;
      state.items = [...items];
      state.totalQuantity = state.items.length;
      let totalPrice = 0;
      state.items.forEach((item) => (totalPrice += item.totalPrice));
      state.cartTotalPrice = totalPrice;
    },
    emptyCart(state, action) {
      state.items = [];
      state.totalQuantity = 0;
      state.cartTotalPrice = 0;
    },
    addItem(state, action) {
      const item = action.payload;
      state.items = [...state.items, item];
      state.totalQuantity = state.items.length;
      let totalPrice = 0;
      state.items.forEach((item) => (totalPrice += item.totalPrice));
      state.cartTotalPrice = totalPrice;
    },
    deleteItem(state, action) {
      state.items = state.items.filter(
        (stateItem) => stateItem.id !== action.payload
      );
      state.totalQuantity = state.items.length;
      let totalPrice = 0;
      state.items.forEach((item) => (totalPrice += item.totalPrice));
      state.cartTotalPrice = totalPrice;
    },
    addQuantity: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload) {
          item.quantity = item.quantity + 1;
          item.totalPrice = item.totalPrice + item.productPrice;
        }
      });
      state.totalQuantity = state.items.length;
      let totalPrice = 0;
      state.items.forEach((item) => (totalPrice += item.totalPrice));
      state.cartTotalPrice = totalPrice;
    },
  },
});

export const fetchCart = (user) => async (dispatch) => {
  const { uid } = user;

  console.log(uid);
  // console.log("userid: ", user.uid);
  const docRef = doc(db, "cart", user.uid);
  const colRef = collection(docRef, "userCart");

  const unsub = onSnapshot(colRef, (userCart) => {
    const cartItems = [];
    userCart &&
      userCart.forEach((item) => {
        cartItems.push(item.data());
      });
    // console.log("userCart", userCart.data());
    // const userCart = currentUser.data().cart.cartItems;
    console.log("userCart: ", cartItems);
    // const cartItems = [];
    // console.log(cartItems);
    // userCart &&
    //   userCart.forEach((item) => {
    //     cartItems.push(item);
    //   });
    userCart && dispatch(loadItems(cartItems));
  });

  return () => unsub();
};

export const { loadItems, emptyCart, addItem, deleteItem, addQuantity } =
  cart.actions;
export default cart;
