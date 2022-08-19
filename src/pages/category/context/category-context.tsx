import {
  CategoryRequestDTO,
  CategoryResponseDTO as Category,
} from "api/category/dto";
import { CategoryService, ICategoryService } from "api/category/service";
import { SubCategoryRequestDTO } from "api/sub-category/dto";
import {
  ISubCategoryService,
  SubCategoryService,
} from "api/sub-category/service";
import { setCreatedAlert } from "common";
import { ContextAlert } from "Context";
import * as React from "react";

export const ContextCategory = React.createContext<CategoryContextType | null>(
  null
);

export type CategoryContextType = {
  categories: Category[];
  fetchCategories: (params?: GetCategoryParams) => Promise<void>;
  insertCategory: (category: CategoryRequestDTO) => Promise<void>;
  updateCategory: (category: CategoryRequestDTO) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  insertSubCategory: (subCategory: SubCategoryRequestDTO) => Promise<void>;
  updateSubCategory: (category: SubCategoryRequestDTO) => Promise<void>;
  deleteSubCategory: (id: number) => Promise<void>;
};

export type GetCategoryParams = {
  categoryId?: number;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { setAlert } = React.useContext(ContextAlert);
  const categoryService: ICategoryService = new CategoryService();
  const subCategoryService: ISubCategoryService = new SubCategoryService();

  React.useEffect(() => {
    async function Init() {
      await fetchCategories();
    }
    Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCategories = async (params?: GetCategoryParams) => {
    try {
      const { data } = await categoryService.getAll();
      setCategories(data);
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
    }
  };

  const insertSubCategory = async (subCategory: SubCategoryRequestDTO) => {
    try {
      const {
        status,
        message,
        internalMessage,
      } = await subCategoryService.insert(subCategory);
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  const insertCategory = async (category: CategoryRequestDTO) => {
    try {
      const { status, message, internalMessage } = await categoryService.insert(
        category
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  const updateCategory = async (category: CategoryRequestDTO) => {
    try {
      const { status, message, internalMessage } = await categoryService.update(
        category
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  const deleteSubCategory = async (id: number) => {
    try {
      const {
        status,
        message,
        internalMessage,
      } = await subCategoryService.delete(id);
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  const updateSubCategory = async (category: SubCategoryRequestDTO) => {
    try {
      const {
        status,
        message,
        internalMessage,
      } = await subCategoryService.update(category);
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const { status, message, internalMessage } = await categoryService.delete(
        id
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchCategories();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  return (
    <ContextCategory.Provider
      value={{
        categories,
        fetchCategories,
        insertSubCategory,
        insertCategory,
        updateCategory,
        deleteSubCategory,
        updateSubCategory,
        deleteCategory,
      }}
    >
      {children}
    </ContextCategory.Provider>
  );
};

export default CategoryProvider;
