import { Grid } from "@material-ui/core";
import FcCategoryFilter from "components/fc-filter-fields/expense/fc-category-filter";
import FcDateTypeFilter from "components/fc-filter-fields/expense/fc-date-type-filter";
import FcWalletFilter from "components/fc-filter-fields/expense/fc-wallet-filter";

import FcSurface from "components/fc-surface/fc-surface";

export default function FcDataGridFilters() {
  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <FcDateTypeFilter />
        </Grid>
        <Grid item xs={4}>
          <FcCategoryFilter />
        </Grid>
        <Grid item xs={4}>
          <FcWalletFilter />
        </Grid>
      </Grid>
    </FcSurface>
  );
}