import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { deleteItem } from "../store/cartSlice";
import { useAuthContext } from "./useAuthContext";

export const useDeleteCart = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems.items);

  const deleteCart = async (item) => {
    setError(null);
    setIsPending(true);

    const selectedItem = cartItems.find((product) => product.id === item.id);
    console.log(selectedItem);

    if (user) {
      const docRef = doc(db, "cart", user.uid);
      const colRef = collection(docRef, "userCart");
      const cartItemRef = doc(colRef, selectedItem.id);

      try {
        await deleteDoc(cartItemRef);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    } else {
      dispatch(deleteItem(selectedItem.id));
    }
  };

  return { deleteCart, error, isPending };
};
