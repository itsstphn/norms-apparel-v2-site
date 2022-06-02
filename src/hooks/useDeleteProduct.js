import { deleteDoc, doc } from "firebase/firestore";

import { useState } from "react";
import { db } from "../firebase/config";

export const useDeleteProduct = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const deleteProduct = async (productID) => {
    setIsPending(true);
    setError(null);
    try {
      const docRefProduct = doc(db, "products", productID);
      await deleteDoc(docRefProduct);

      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, deleteProduct };
};
