import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (!context)
    throw new Error("useContext must be inside CategoriesContextProvider");

  return context;
};
