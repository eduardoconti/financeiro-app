import { useEffect } from "react";
import { Grid } from "@material-ui/core";

import FcTableCategory from "./components/table/fc-table-category";
import FcFormCategory from "./components/form/fc-form-category";
import FcFormSubCategory from "./components/form/fc-form-sub-category";
import { useCategory } from "./hook";

export default function CorpoCategorias() {
  const fetchCategories = useCategory(s => s.fetchCategories);

  useEffect(() => {
    const Init = async () => {
      await fetchCategories();
    };
    Init();
  }, [fetchCategories]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <FcTableCategory />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FcFormCategory />
          </Grid>
          <Grid item xs={12}>
            <FcFormSubCategory />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
