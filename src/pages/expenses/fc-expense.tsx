import { FormProvider } from "Context";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
  return (
    <FormProvider>
      <CorpoDespesas />
    </FormProvider>
  );
}
