import { TextField } from "@material-ui/core";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext } from "react";
const options = [
  { id: 'DUE_DATE', descricao: 'Vencimento' },
  { id: 'UNPLANNED', descricao: 'Não Planejadas' },
];
export default function FcDateTypeFilter() {
  const { filter, setFilter } = useContext(ContextExpenseFilter) as ExpenseFilterContextType;
  return (
    <TextField
      id={'fc-date-type-filter'}
      label={'Tipo'}
      variant="outlined"
      size="small"
      fullWidth
      value={filter?.dateField ?? "DUE_DATE"}
      select
      onChange={(event) => {
        setFilter({ ...filter, dateField: event.target.value });
      }}
    >
      {Menu(options)}
    </TextField>
  );

}