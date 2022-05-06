import {
  Grid,
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
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";

const useStyles = makeStyles((theme) => ({
  selectedRows: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
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

export default function FcSelectedRows(props) {
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState(false);
  const { onClick, onDeleted, onClickFlag } = props;

  const total = totalizador(ctxDataGrid.selectedRows, ctxDataGrid.rows);
  return total > 0 ? (
    <Grid container spacing={0} className={classes.selectedRows}>
      <Grid item xs={1}>
        <IconButton
          aria-label="selected"
          style={{
            color: selected
              ? theme.palette.error.light
              : theme.palette.success.main,
            padding: 2,
          }}
          onClick={() => {
            ctxSpin.setSpin(true);
            const data = JSON.parse(getStorageDataGridRows());
            if (!selected) {
              const selectedData = data.filter((row) => {
                if (ctxDataGrid.selectedRows.includes(row.id)) {
                  return row;
                }
              });
              ctxDataGrid.setRows(selectedData);
            } else {
              ctxDataGrid.setRows(JSON.parse(getStorageDataGridRows()));
            }
            setSelected(!selected);
            ctxSpin.setSpin(false);
          }}
        >
          {selected ? <CloseTwoToneIcon /> : <CheckTwoToneIcon />}
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1" className={classes.legend}>
          Rows: {ctxDataGrid.selectedRows.length}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" className={classes.legend} align="right">
          Total: {total.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={5} container justifyContent="flex-end" align="left">
        <Grid item xs={2} sm={1}>
          <IconButton
            aria-label="next-month"
            style={{
              color: theme.palette.success.dark,
              padding: 2,
            }}
            onClick={async () => {
              ctxSpin.setSpin(true);

              const data = ctxDataGrid.selectedRows;
              await onClick(data);
              setSelected(false);
              ctxSpin.setSpin(false);
            }}
          >
            {<ArrowForwardIosTwoToneIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
            aria-label="flagPayed"
            style={{
              color: theme.palette.success.light,
              padding: 2,
            }}
            onClick={async () => {
              ctxSpin.setSpin(true);

              const data = ctxDataGrid.selectedRows;
              await onClickFlag(data, true);
              setSelected(false);
              ctxSpin.setSpin(false);
            }}
          >
            {<FiberManualRecordTwoToneIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
            aria-label="flag"
            style={{
              color: theme.palette.error.light,
              padding: 2,
            }}
            onClick={async () => {
              ctxSpin.setSpin(true);

              const data = ctxDataGrid.selectedRows;
              await onClickFlag(data, false);
              setSelected(false);
              ctxSpin.setSpin(false);
            }}
          >
            {<FiberManualRecordTwoToneIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
            aria-label="delete"
            style={{
              color: theme.palette.error.dark,
              padding: 2,
            }}
            onClick={async () => {
              ctxSpin.setSpin(true);

              const data = ctxDataGrid.selectedRows;
              await onDeleted(data);
              setSelected(false);
              ctxSpin.setSpin(false);
            }}
          >
            {<DeleteForeverTwoToneIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
}
