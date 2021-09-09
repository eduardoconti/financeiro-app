import React, { useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { ContextDataGrid } from "../../Context/DataGridContext";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 360,
    [theme.breakpoints.down("sm")]: {
      height: 260,
    },
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
  selectedRows: {
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    height: 48,
  },
  columnHeader: {
    border: "none",
  },
  root: {
    border: "none",

    "& .MuiDataGrid-cell": {
      color: theme.palette.contrastThreshold,
      borderBottom: 0,
    },

    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnsContainer": {
      borderBottom: 0,
    },
  },
}));

export default function FcDataGrid(props) {
  const classes = useStyles();
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <Box className={classes.container}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        rowHeight={30}
        onRowClick={props.rowClick}
        checkboxSelection={props.checkboxSelection}
        disableSelectionOnClick
        hideFooterSelectedRowCount
        hideFooterRowCount
        hideFooter
        hideFooterPagination
        className={classes.root}
        onSelectionChange={(props) => {
          const { rowIds } = props;
          ctxDataGrid.setSelectedRows(rowIds);
        }}
      />
    </Box>
  );
}
