import { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import FcFormCategory from "../../components/fc-forms/category/fc-form-category";
import { CategoryContextType, ContextCategory } from "./context/category-context";
import FcTableCategory from "./components/table/fc-table-category";

export default function CorpoCategorias() {

  const { fetchCategories } = useContext(ContextCategory) as CategoryContextType;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (

    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        {/* <FcDataGridCategory /> */}
        <FcTableCategory/>
      </Grid>

      <Grid item xs={12} md={4}>
        <FcFormCategory />
      </Grid>
    </Grid>

  );
}
