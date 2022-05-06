import React, { useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  makeStyles,
  createTheme,
  darken,
  lighten,
} from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { ContextDataGrid } from "../../Context/DataGridContext";

function getThemePaletteMode(palette) {
  return palette.type || palette.mode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.6)
        : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.5)
        : lighten(color, 0.5);

    return {
      container: {
        height: 320,
        [theme.breakpoints.down("sm")]: {
          height: 220,
        },
        backgroundColor: theme.palette.background.paper01,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
      },
      root: {
        border: "none",
        "& .MuiDataGrid-cell": {
          borderBottom: 0,
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-columnsContainer": {
          borderBottom: 0,
        },
        "& .super-app-theme--Open": {
          backgroundColor: getBackgroundColor(theme.palette.background.paper01),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.primary.main
            ),
          },
        },
        "& .super-app-theme--Filled": {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main
            ),
          },
        },
        "& .super-app-theme--PartiallyFilled": {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.warning.main
            ),
          },
        },
        "& .super-app-theme--Rejected": {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    };
  },
  { defaultTheme }
);

export default function FcDataGrid(props) {
  const classes = useStyles();
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <Box style={{ height: 320, width: "100%" }} className={classes.container}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        rowHeight={30}
        onRowClick={props.rowClick}
        checkboxSelection={props.checkboxSelection}
        disableSelectionOnClick
        hideFooterSelectedRowCount
        hideFooter
        hideFooterPagination
        className={classes.root}
        onSelectionModelChange={(props) => {
          ctxDataGrid.setSelectedRows(props);
        }}
        getRowClassName={(params) => `super-app-theme--Open`}
        
      />
    </Box>
  );
}
