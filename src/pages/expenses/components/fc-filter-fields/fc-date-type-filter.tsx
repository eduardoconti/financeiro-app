import { FcTextField } from "@components/fc-forms/fc-fields";
import { useExpenseFilter } from "@pages/expenses/hook";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import shallow from "zustand/shallow";

const options = [
  { id: "DUE_DATE", descricao: "Vencimento" },
  { id: "UNPLANNED", descricao: "Não Planejadas" },
];
export function FcDateTypeFilter() {
  const { dateField, setDateField } = useExpenseFilter(s => ({
    dateField: s.dateField,
    setDateField: s.setDateField
  }), shallow)
  return (
    <FcTextField
      id={"fc-date-type-filter"}
      label={"Tipo"}
      value={dateField ?? "DUE_DATE"}
      select
      onChange={(event) => {
        setDateField(event.target.value);
      }}
    >
      {Menu(options)}
    </FcTextField>
  );
}
