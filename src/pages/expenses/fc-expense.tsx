import { DataGridExpenseProvider } from "./context/data-grid-expense-context";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
  return (
    <DataGridExpenseProvider>
      <CorpoDespesas />
    </DataGridExpenseProvider>
  );
}
