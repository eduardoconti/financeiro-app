import { useContext } from "react";
import {
  CategoryContextType,
  ContextCategory,
} from "../context/category-context";

export function useCategory(): CategoryContextType {
  const context = useContext(ContextCategory) as CategoryContextType;

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
}
