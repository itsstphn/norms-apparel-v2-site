import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useAddCart = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();
  const cartItems = useSelector((state) => state.cartItems.items);

  const addCart = async (item) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (!existingItem) {
        await setDoc(
          docRef,
          {
            cart: arrayUnion({
              id: item.id,
              productName: item.productName,
              productPrice: +item.productPrice,
              quantity: 1,
              totalPrice: +item.productPrice,
              productImgURL: item.productImgURL,
            }),
          },
          { merge: true }
        );
      } else {
        await updateDoc(docRef, {
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.totalPrice + existingItem.productPrice,
        });
      }
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { addCart, error, isPending };
};
