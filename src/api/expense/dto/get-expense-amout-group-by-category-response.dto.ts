export type GetExpenseAmountGroupByCategoryResponse = {
  value: number;
  description: string;
  id: number;
  subCategoryData: SubCategoryData[];
}

export type SubCategoryData = {
  id: number;
  description: string;
  value: number;
};
