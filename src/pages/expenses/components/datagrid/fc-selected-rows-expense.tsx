import { Grid, Typography, useTheme } from "@material-ui/core";
import FcIconButton from "components/fc-button/fc-icon-button";
import FcSurface from "components/fc-surface/fc-surface";
import { useDataGridExpense } from "pages/expenses/hook/use-data-grid-expense";

import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { useMemo } from "react";

export function FcSelectedRowsExpense() {
  const { selectedRows } = useDataGridExpense();

  const theme = useTheme();
  return useMemo(() => {
    if (!selectedRows || selectedRows.length === 0) {
      return null;
    }
    return (
      <FcSurface style={{ marginTop: theme.spacing(1) }}>
        <Grid container spacing={1}>
          <Grid item xs={2} sm={1}>
            <FcIconButton
              aria-label="next-month"
              style={{
                padding: 2,
              }}
              color={theme.palette.success.dark}
              onClick={async () => {
                // const data = selectedRows;
                // await onClick(data);
                // setCropedRows(false);
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
                // const data = selectedRows;
                // await onClickFlag(data, true);
                // setCropedRows(false);
                // setSelectedRows([]);
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
                // const data = selectedRows;
                // await onClickFlag(data, false);
                // setCropedRows(false);
                // setSelectedRows([]);
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
                // const data = selectedRows;
                // await onDeleted(data);
                // setCropedRows(false);
                // setSelectedRows([]);
              }}
            >
              {<DeleteForeverTwoToneIcon fontSize="large" />}
            </FcIconButton>
          </Grid>

          <Grid item xs={3} lg={7}>
            <Typography
              variant="subtitle1"
              //className={classes.legend}
              align="right"
            >
              {/* {Money.format(total)} */}
            </Typography>
          </Grid>
        </Grid>
      </FcSurface>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);
}
