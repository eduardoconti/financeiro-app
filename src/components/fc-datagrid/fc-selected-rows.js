import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
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
    color: theme.palette.success.light,
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
  const { selectedRows, setRows, ...ctxDataGrid } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);
  const classes = useStyles();
  const theme = useTheme();
  const [cropedRows, setCropedRows] = useState(false);
  const { onClick, onDeleted, onClickFlag } = props;
  const storageData = JSON.parse(getStorageDataGridRows());
  const total = totalizador(selectedRows, ctxDataGrid.rows);
  
  return selectedRows.length > 0 ? (
    <Box className={classes.selectedRows}>
      <Grid container spacing={1} align="center" alignItems="center">
        <Grid item xs={1} align="left">
          <IconButton
            aria-label="cropedRows"
            style={{
              color: cropedRows
                ? theme.palette.error.light
                : theme.palette.success.main,
              padding: 2,
            }}
            onClick={() => {
              setSpin(true);

              if (!cropedRows) {
                const selectedData = storageData.filter((row) => {
                  if (selectedRows.includes(row.id)) {
                    return row;
                  }
                });
                setRows(selectedData);
              } else {
                setRows(storageData);
              }
              setCropedRows(!cropedRows);
              setSpin(false);
            }}
          >
            {cropedRows ? <CloseTwoToneIcon /> : <CheckTwoToneIcon />}
          </IconButton>
        </Grid>

        <Grid item xs={2} sm={1}>
          <IconButton
            aria-label="next-month"
            style={{
              color: theme.palette.success.dark,
              padding: 2,
            }}
            onClick={async () => {
              setSpin(true);

              const data = selectedRows;
              await onClick(data);
              setCropedRows(false);
              setSpin(false);
            }}
          >
            {<ArrowForwardIosTwoToneIcon fontSize="large" />}
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
              setSpin(true);

              const data = selectedRows;
              await onClickFlag(data, true);
              setCropedRows(false);
              setSpin(false);
            }}
          >
            {<FiberManualRecordTwoToneIcon fontSize="large" />}
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
              setSpin(true);

              const data = selectedRows;
              await onClickFlag(data, false);
              setCropedRows(false);
              setSpin(false);
            }}
          >
            {<FiberManualRecordTwoToneIcon fontSize="large" />}
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
              setSpin(true);

              const data = selectedRows;
              await onDeleted(data);
              setCropedRows(false);
              setSpin(false);
            }}
          >
            {<DeleteForeverTwoToneIcon fontSize="large" />}
          </IconButton>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            variant="subtitle1"
            className={classes.legend}
            align="right"
          >
            {total.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  ) : null;
}
