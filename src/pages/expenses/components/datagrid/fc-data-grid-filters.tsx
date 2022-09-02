import FcSurface from "@components/fc-surface/fc-surface";
import { Grid } from "@material-ui/core";
import { FcCategoryFilter, FcDateTypeFilter, FcSubCategoryFilter, FcWalletFilter } from "../fc-filter-fields";


export default function FcDataGridFilters() {
  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3}>
          <FcDateTypeFilter />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FcCategoryFilter />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FcSubCategoryFilter />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FcWalletFilter />
        </Grid>
      </Grid>
    </FcSurface>
  );
}
