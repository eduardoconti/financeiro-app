import { Grid } from "@material-ui/core";
import { FcDataGridEarning } from "./components/datagrid";
import { FcFormEarning } from "./components/form";

export function EarningBody() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGridEarning />
      </Grid>
      {/* <Grid item xs={12}>
          <FcSelectedRows
            onClick={async (data) => {
              data.forEach(async (element) => {
                const res = await retornaReceitaPorId(element);

                let {
                  data: { id, carteira, ...earning },
                } = res;
                const insertRes = await insereReceita({
                  ...earning,
                  userId: getUserIdFromToken(),
                  pagamento: addMonth(earning.pagamento),
                  carteiraId: carteira.id,
                  pago: false,
                });
                ctxAlert.setAlert(
                  setCreatedAlert(
                    insertRes.status,
                    insertRes.message,
                    insertRes.internalMessage
                  )
                );
              });
            }}
            onDeleted={async (data) => {
              data.forEach(async (element) => {
                const deleted = await deletaReceita(element);

                ctxAlert.setAlert(
                  setCreatedAlert(
                    deleted.status,
                    deleted.message,
                    deleted.internalMessage
                  )
                );
              });
              setStateTotais(
                await calculaTotais(
                  stateCheckedDespesas,
                  stateCheckedReceitas,
                  stateAnoAtual,
                  stateMesAtual
                )
              );
            }}
          />
        </Grid> */}
      <Grid item xs={12}>
        <FcFormEarning />
      </Grid>
    </Grid>
  );
}
