import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { addItem, addQuantity, loadItems } from "../store/cartSlice";
import { useAuthContext } from "./useAuthContext";

export const useAddCart = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();
  const cartItems = useSelector((state) => state.cartItems.items);
  const dispatch = useDispatch();

  const addCart = async (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (user) {
      try {
        const docRef = doc(db, "cart", user.uid);
        const colRef = collection(docRef, "userCart");
        const cartItemRef = doc(colRef, item.id);
        console.log("existingItem :", existingItem);
        if (!existingItem) {
          await setDoc(cartItemRef, {
            id: item.id,
            productName: item.productName,
            productPrice: +item.productPrice,
            quantity: 1,
            totalPrice: +item.productPrice,
            productImgURL: item.productImgURL,
          });
        } else {
          await updateDoc(cartItemRef, {
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.totalPrice + existingItem.productPrice,

            // cart: {
            //   cartItems: {
            //     quantity: existingItem.quantity + 1,
            //     totalPrice: existingItem.totalPrice + existingItem.productPrice,
            //   },
            // },
            // "cart.cartItems.quantity": existingItem.quantity + 1,
            // "cart.cartItems.totalPrice":
            //   existingItem.totalPrice + existingItem.productPrice,
          });
        }
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    } else {
      if (!existingItem) {
        dispatch(
          addItem({
            id: item.id,
            productName: item.productName,
            productPrice: +item.productPrice,
            quantity: 1,
            totalPrice: +item.productPrice,
            productImgURL: item.productImgURL,
          })
        );
      } else {
        dispatch(addQuantity(item.id));
      }
    }
  };

  return { addCart, error, isPending };
};
