import { TextField } from "@material-ui/core";
import { isAuthenticated, retornaCategorias } from "common";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import SpinCircular from "components/fc-spin/fc-spin";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext, useEffect, useState } from "react";

export default function FcCategoryFilter() {
  const { filter, setFilter } = useContext(ContextExpenseFilter) as ExpenseFilterContextType;
  const [categories, setCategories] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const {data} = await retornaCategorias();
      data.unshift({id: 0, descricao: "Todas"})
      setCategories(data);
    }
    if (isAuthenticated()) {
      setSpin(true);
      fetchData();
      setSpin(false);
    }
  }, []);
  return (
    <TextField
      id={'fc-category-filter'}
      label={'Categoria'}
      variant="outlined"
      size="small"
      fullWidth
      value={filter?.categoryId ?? 0}
      select
      onChange={(event) => {
        setFilter({ ...filter, categoryId: parseInt(event.target.value) });
      }}
    >
      {spin ? <SpinCircular size={20} /> : Menu(categories)}
    </TextField>
  );

}