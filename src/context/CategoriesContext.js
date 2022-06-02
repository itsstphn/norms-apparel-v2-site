import { createContext, useState } from "react";

export const CategoriesContext = createContext();

export const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    "men",
    "women",
    "shoes",
    "tshirts",
    "shorts",
    "slippers",
    "dress",
    "kids",
  ]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
