import { useEffect, useMemo } from "react";
import { Grid } from "@material-ui/core";

import FcTableCategory from "./components/table/fc-table-category";
import FcFormCategory from "./components/form/fc-form-category";
import FcFormSubCategory from "./components/form/fc-form-sub-category";
import { useCategory } from "./hook";

export default function CorpoCategorias() {
  const { fetchCategories } = useCategory();

  useEffect(() => {
    const Init = async () => {
      await fetchCategories();
    };
    Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useMemo(() => {
    return (
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
    );
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <FcTableCategory />
      </Grid>
      {form}
    </Grid>
  );
}
