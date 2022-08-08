import CorpoCategorias from "./fc-category-body";
import { FormProvider } from "../../Context/FormContext";
import CategoryProvider from "./context/category-context";

export default function FcCategory() {
  return (
    <CategoryProvider>
      <FormProvider>
        <CorpoCategorias />
      </FormProvider>
    </CategoryProvider>
  );
}
