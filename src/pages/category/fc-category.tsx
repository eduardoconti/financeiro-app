import CorpoCategorias from "./fc-category-body";
import CategoryProvider from "./context/category-context";
import FormSubCategoryProvider from "./context/form-sub-category-context";

export default function FcCategory() {
  return (
      <FormSubCategoryProvider>
        <CategoryProvider>
          <CorpoCategorias />
        </CategoryProvider>
      </FormSubCategoryProvider>
  );
}
