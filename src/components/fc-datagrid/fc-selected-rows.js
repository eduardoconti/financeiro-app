import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useContext, useState } from "react";
import { ContextDataGrid } from "../../Context/DataGridContext";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import { getStorageDataGridRows } from "../../common/DataGridStorage";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import FcSurface from "components/fc-surface/fc-surface";
import { Money } from "common";
import FcIconButton from "components/fc-button/fc-icon-button";

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

    total += data ? Money.formatToNumber(data.valor) : 0;
  });

  return total;
}

export default function FcSelectedRows(props) {
  const { selectedRows, setRows, setSelectedRows, ...ctxDataGrid } = useContext(
    ContextDataGrid
  );

  const classes = useStyles();
  const theme = useTheme();
  const [cropedRows, setCropedRows] = useState(false);
  const { onClick, onDeleted, onClickFlag } = props;
  const storageData = JSON.parse(getStorageDataGridRows());
  const total = totalizador(selectedRows, ctxDataGrid.rows);

  return selectedRows.length > 0 ? (
    <FcSurface className={classes.selectedRows}>
      <Grid container spacing={1} align="center" alignItems="center">
        <Grid item xs={1} align="left">
          <FcIconButton
            aria-label="cropedRows"
            style={{
              padding: 2,
            }}
            color={
              cropedRows
                ? theme.palette.error.light
                : theme.palette.success.main
            }
            onClick={() => {
              if (!cropedRows) {
                // eslint-disable-next-line array-callback-return
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
            }}
          >
            {cropedRows ? <CloseTwoToneIcon /> : <CheckTwoToneIcon />}
          </FcIconButton>
        </Grid>

        <Grid item xs={2} sm={1}>
          <FcIconButton
            aria-label="next-month"
            style={{
              padding: 2,
            }}
            color={theme.palette.success.dark}
            onClick={async () => {
              const data = selectedRows;
              await onClick(data);
              setCropedRows(false);
            }}
          >
            {<ArrowForwardIosTwoToneIcon fontSize="large" />}
          </FcIconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <FcIconButton
            aria-label="flagPayed"
            style={{
              padding: 2,
            }}
            color={theme.palette.success.light}
            onClick={async () => {
              const data = selectedRows;
              await onClickFlag(data, true);
              setCropedRows(false);
              setSelectedRows([]);
            }}
          >
            {<FiberManualRecordTwoToneIcon fontSize="large" />}
          </FcIconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <FcIconButton
            aria-label="flag"
            style={{
              padding: 2,
            }}
            color={theme.palette.error.light}
            onClick={async () => {
              const data = selectedRows;
              await onClickFlag(data, false);
              setCropedRows(false);
              setSelectedRows([]);
            }}
          >
            {<FiberManualRecordTwoToneIcon fontSize="large" />}
          </FcIconButton>
        </Grid>
        <Grid item xs={2} sm={1}>
          <FcIconButton
            aria-label="delete"
            style={{
              padding: 2,
            }}
            color={theme.palette.error.dark}
            onClick={async () => {
              const data = selectedRows;
              await onDeleted(data);
              setCropedRows(false);
              setSelectedRows([]);
            }}
          >
            {<DeleteForeverTwoToneIcon fontSize="large" />}
          </FcIconButton>
        </Grid>

        <Grid item xs={3} lg={7}>
          <Typography
            variant="subtitle1"
            className={classes.legend}
            align="right"
          >
            {Money.format(total)}
          </Typography>
        </Grid>
      </Grid>
    </FcSurface>
  ) : null;
}
