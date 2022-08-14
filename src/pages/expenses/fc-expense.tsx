import { FormProvider } from "Context";
import CategoryProvider from "pages/category/context/category-context";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
  return (
    <FormProvider>
      <CategoryProvider>
        <CorpoDespesas />
      </CategoryProvider>
    </FormProvider>
  );
}
