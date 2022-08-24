import { DataGrid } from "@material-ui/data-grid";
import {
  makeStyles,
  createTheme,
  darken,
  lighten,
} from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

function getThemePaletteMode(palette) {
  return palette.type || palette.mode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.1)
        : lighten(color, 0.1);

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
        backgroundColor: theme.palette.background.paper,
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
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.primary.main
            ),
          },
        },
        "& .super-app-theme--Rejected": {
          backgroundColor: getBackgroundColor(theme.palette.error.light),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.light),
          },
        },
      },
    };
  },
  { defaultTheme }
);

export default function FcDataGrid(props) {
  const classes = useStyles();
  return (
    <Box style={{ height: 280, width: "100%" }} className={classes.container}>
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
        onSelectionModelChange={props?.onSelectionModelChange}
        // getRowClassName={(params) => {
        //   const { row } = params;
        //   console.log(row);
        //   if(row.subCategoryId === '0'){
        //     return 'super-app-theme--Rejected';
        //   }
        //   //return row.subCategoryId !== '0' ? `super-app-theme--Open` : `super-app-theme--Rejected`;
        // }}
      />
    </Box>
  );
}
