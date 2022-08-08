import { CategoryResponseDTO as Category } from 'api/category/dto';
import { retornaCategorias } from 'common';
import * as React from 'react';

export const ContextCategory = React.createContext<CategoryContextType | null>(null);

export type CategoryContextType = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: (params?: GetCategoryParams) => Promise<void>;
};

export type GetCategoryParams = {
  categoryId?: number;
}

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};
const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const fetchCategories = React.useCallback(async (params?: GetCategoryParams) => {
    const { data } = await retornaCategorias();
    console.log(data);
    setCategories(data);
  }, []);
  return (
    <ContextCategory.Provider
      value={{
        categories,
        setCategories,
        fetchCategories,
      }}
    >
      {children}
    </ContextCategory.Provider>
  );
}

export default CategoryProvider;
