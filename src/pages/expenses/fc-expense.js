import { emptyFormularioDespesa } from "common";
import { FormProvider } from "Context";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
  return (
    <FormProvider form={emptyFormularioDespesa()}>
      <CorpoDespesas />
    </FormProvider>
  );
}
