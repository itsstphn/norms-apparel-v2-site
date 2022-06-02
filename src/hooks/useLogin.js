import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      dispatch({ type: "SIGNIN", payload: response.user });

      if (response.user) {
        const docRef = doc(db, "users", response.user.uid);
        const responseDoc = await getDoc(docRef);
        if (responseDoc.data().userType === "admin") {
          console.log("updated to admin after sign in");
          dispatch({ type: "USER_IS_ADMIN" });
        }
      }

      !isCancelled && setIsPending(false);
    } catch (error) {
      console.log(isCancelled);

      setError(error.code);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, login };
};
