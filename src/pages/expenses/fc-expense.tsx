import { DataGridExpenseProvider } from "./context/data-grid-expense-context";
import FormExpenseProvider from "./context/form-expense-context";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
 
  return (
    <DataGridExpenseProvider>
      <FormExpenseProvider>
        <CorpoDespesas />
      </FormExpenseProvider>
    </DataGridExpenseProvider>
  );
}
