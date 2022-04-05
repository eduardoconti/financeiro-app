import React, { useEffect, useState, useContext } from "react";
import Menu from "../fc-menu-tem/fc-menu-item";
import { retornaCategorias } from "../../../common/CategoriaFuncoes";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";
import { isAuthenticated } from "../../../common/Auth";
import SpinCircular from "../../fc-spin/fc-spin";
export default function FcSelectFieldCategory() {
  const [categories, setCategories] = useState([]);
  const [spin, setSpin] = useState(false);
  const ctxForm = useContext(ContextForm);

  useEffect(() => {
    if (isAuthenticated()) {
      async function fetchData() {
        setCategories(await retornaCategorias());
      }
      setSpin(true);
      fetchData();
      setSpin(false);
    }
  }, []);

  return (
    <TextField
      id="categoriaId"
      label="Categoria"
      variant="outlined"
      size="small"
      fullWidth
      value={ctxForm.form.categoriaId ?? ''}
      select
      onChange={(event) => {
        ctxForm.setForm({ ...ctxForm.form, categoriaId: event.target.value });
      }}
    >
      {spin ? <SpinCircular size={20} /> : Menu(categories)}
    </TextField>
  );
}
