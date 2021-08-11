import { Box, makeStyles, Typography} from "@material-ui/core";
import React, { useContext } from "react";
import { ContextDataGrid } from "../../Context/DataGridContext";
const useStyles = makeStyles((theme) => ({
  selectedRows: {
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    height: 48,
  },
  root: {
    display: "flex",
    flexDirection: "row",
  },
  legend: {
    color: theme.palette.primary.dark,
  },
}));

function totalizador(selectedRows, rows) {
  let total = 0;
  let data;
  selectedRows.forEach((idSelected) => {
    data = rows.find((element, i) => {
      return element.id === parseInt(idSelected);
    });

    total += data ? parseFloat(data.valor) : 0;
  });
  console.log(selectedRows, rows);
  return total;
}

export default function FcSelectedRows() {
  const ctxDataGrid = useContext(ContextDataGrid);
  const classes = useStyles();

  let total = totalizador(ctxDataGrid.selectedRows, ctxDataGrid.rows);
  return total > 0 ? (
    <Box className={classes.selectedRows}>
      <div className={classes.root}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" className={classes.legend}>
            Selecionado(s): {ctxDataGrid.selectedRows.length}
          </Typography>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" className={classes.legend}>
            Total: {total.toFixed(2)}
          </Typography>
        </div>
      </div>
    </Box>
  ) : null;
}
