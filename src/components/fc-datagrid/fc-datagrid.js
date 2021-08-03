import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 360,
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
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
  return (
    <Box className={classes.container}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        rowHeight={30}
        hideFooterSelectedRowCount
        hideFooterRowCount
        disableColumnMenu
        hideFooter
        hideFooterPagination
        className={classes.root}
      />
    </Box>
  );
}
