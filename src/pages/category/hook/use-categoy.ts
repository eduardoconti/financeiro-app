import { SuccessResponseData } from "@api/http-request/dto";
import { CategoryRequestDTO, CategoryResponseDTO } from "@api/category/dto";
import { CategoryService } from "@api/category/service";
import create from "zustand";
import { SubCategoryRequestDTO } from "@api/sub-category/dto";
import {
  ISubCategoryService,
  SubCategoryService,
} from "@api/sub-category/service";

export interface IUseCategory {
  categories: CategoryResponseDTO[];
  fetchCategories: () => void;
  insertCategory: (
    categoryRequest: CategoryRequestDTO
  ) => Promise<SuccessResponseData<CategoryResponseDTO>>;
  updateCategory: (
    categoryRequest: CategoryRequestDTO
  ) => Promise<SuccessResponseData<CategoryResponseDTO>>;
  deleteCategory: (id: number) => Promise<SuccessResponseData<any>>;
  insertSubCategory: (
    subCategory: SubCategoryRequestDTO
  ) => Promise<SuccessResponseData<any>>;
  updateSubCategory: (
    subCategory: SubCategoryRequestDTO
  ) => Promise<SuccessResponseData<any>>;
  deleteSubCategory: (id: number) => Promise<SuccessResponseData<any>>;
}
export const useCategory = create<IUseCategory>((set, get) => ({
  categories: [],
  fetchCategories: async () => {
    const service = new CategoryService();
    const { data } = await service.getAll();
    set({ categories: data });
  },
  insertCategory: async (categoryRequest: CategoryRequestDTO) => {
    const service = new CategoryService();
    const data = await service.insert(categoryRequest);
    set((state) => ({
      categories: [...state.categories, data.data].sort((a, b) =>
        a.descricao > b.descricao ? 1 : b.descricao > a.descricao ? -1 : 0
      ),
    }));
    return data;
  },
  updateCategory: async (categoryRequest: CategoryRequestDTO) => {
    const service = new CategoryService();
    const data = await service.update(categoryRequest);
    set((state) => {
      const index = state.categories.findIndex(
        (category) => category.id === categoryRequest.id
      );
      const newCategories = [...state.categories];
      newCategories[index] = data.data;
      return { categories: newCategories };
    });
    return data;
  },
  deleteCategory: async (id: number) => {
    const service = new CategoryService();
    const data = await service.delete(id);
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));
    return data;
  },
  insertSubCategory: async (subCategory: SubCategoryRequestDTO) => {
    const subCategoryService: ISubCategoryService = new SubCategoryService();
    const data = await subCategoryService.insert(subCategory);
    set((state) => {
      const index = state.categories.findIndex(
        (category) => category.id === subCategory.categoryId
      );
      const newCategories = [...state.categories];
      newCategories[index].subCategories = [
        ...newCategories[index].subCategories,
        data.data,
      ];
      return {
        categories: newCategories.sort((a, b) =>
          a.descricao > b.descricao ? 1 : b.descricao > a.descricao ? -1 : 0
        ),
      };
    });
    return data;
  },
  updateSubCategory: async (subCategory: SubCategoryRequestDTO) => {
    const subCategoryService: ISubCategoryService = new SubCategoryService();
    const response = await subCategoryService.update(subCategory);
    const service = new CategoryService();
    const { data } = await service.getAll();
    set({ categories: data });
    return response;
  },
  deleteSubCategory: async (id: number) => {
    const subCategoryService: ISubCategoryService = new SubCategoryService();
    const response = await subCategoryService.delete(id);
    const service = new CategoryService();
    const { data } = await service.getAll();
    set({ categories: data });
    return response;
  },
}));
