import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ActionUpdateButon from "../fc-column-actions-update-button";
import ActionDeleteButon from "../fc-column-actions-delete-button";

import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextForm } from "../../../Context/FormContext";
import {
  retornaCarteiras,
  deletaCarteira,
} from "../../../common/CarteiraFuncoes";

import { isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsWallet(props) {
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const ctxDataGrid = useContext(ContextDataGrid);

  async function setDataGridRows() {
    if (isAuthenticated()) {
      ctxSpin.setSpin(true);
      let { data } = await retornaCarteiras();

      /*if (res.status == 200) {
        ctxDataGrid.setRows(res.data);
      }*/
      ctxDataGrid.setRows(data);
      ctxSpin.setSpin(false);
    }
  }

  const { field } = props;
  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          ctxForm.setForm(field.row);
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          const response = await deletaCarteira(field.row.id);
          await setDataGridRows();
          return response;
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
