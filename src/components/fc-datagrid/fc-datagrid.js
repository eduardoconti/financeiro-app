import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  dataGrid: {
    backgroundColor: theme.palette.background.paper01,
    height: 360,
    borderRadius: theme.borderRadius,
  },
}));
export default function FcDataGrid(props) {
  const classes = useStyles();
  return (
    <Grid className={classes.dataGrid}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        rowHeight={26}
        hideFooterSelectedRowCount
        hideFooterRowCount
        disableColumnMenu
        hideFooter
        hideFooterPagination
        getRowClassName={() => "DataGridColumn"}
      />
    </Grid>
  );
}
