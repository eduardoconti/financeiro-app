import {
  Box,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ContextDataGrid } from "../../Context/DataGridContext";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
import { SpinContext } from "../../Context/SpinContext";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import { getStorageDataGridRows } from "../../common/DataGridStorage";

const useStyles = makeStyles((theme) => ({
  selectedRows: {
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
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

  return total;
}

function setSelectdeRows(selectedRows, rows) {
  let data = [];
  rows.forEach((row) => {
    if (selectedRows.includes(row.id.toFixed(0))) {
      data.push(row);
    }
  });

  if (data) {
    return data;
  }
}

export default function FcSelectedRows() {
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(false);

  let total = totalizador(ctxDataGrid.selectedRows, ctxDataGrid.rows);
  return total > 0 ? (
    <Box className={classes.selectedRows}>
      <div className={classes.root}>
        <div
          style={{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(3),
          }}
        >
          <IconButton
            aria-label="selected"
            style={{
              color: selected
                ? theme.palette.error.dark
                : theme.palette.secondary.dark,
              padding: 2,
            }}
            onClick={() => {
              ctxSpin.setSpin(true);
              if (!selected) {
                ctxDataGrid.setRows(
                  setSelectdeRows(ctxDataGrid.selectedRows, ctxDataGrid.rows)
                );
              } else {
                ctxDataGrid.setRows(JSON.parse(getStorageDataGridRows()));
              }
              setSelected(!selected);
              ctxSpin.setSpin(false);
            }}
          >
            {selected ? <CloseTwoToneIcon /> : <CheckTwoToneIcon />}
          </IconButton>
        </div>
        <div style={{ flexGrow: 0.7 }}>
          <Typography variant="subtitle1" className={classes.legend}>
            Selecionado(s): {ctxDataGrid.selectedRows.length}
          </Typography>
        </div>
        <div style={{ flexGrow: 0.2 }}>
          <Typography variant="subtitle1" className={classes.legend}>
            Total: {total.toFixed(2)}
          </Typography>
        </div>
      </div>
    </Box>
  ) : null;
}
