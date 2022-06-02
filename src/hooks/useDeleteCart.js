import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useDeleteCart = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();

  const cartItems = useSelector((state) => state.cartItems.items);

  const deleteCart = async (item) => {
    setError(null);
    setIsPending(true);

    const selectedItem = cartItems.find((product) => product.id === item.id);

    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        cart: arrayRemove(selectedItem),
      });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { deleteCart, error, isPending };
};
