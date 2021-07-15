import { useTheme } from "@material-ui/core";
import React from "react";
export default function FcColumnActions(props){

  const theme = useTheme();

  return {
    field: "actions",
    headerName: "Ação",
    width: 140,
    sortable: false,
    renderCell: function actions(field) {
      return (
        <Box>
          <IconButton
            aria-label="alterar"
            style={{ color: theme.palette.primary.dark, padding: 2 }}
            onClick={async () => props.onClickUpdate()}
          >
            <CreateTwoToneIcon />
          </IconButton>

          <IconButton
            aria-label="excluir"
            style={{ color: theme.palette.primary.dark, padding: 2 }}
            onClick={async () => {

                await props.onClickDelete()
                setStateTotais(
                    await calculaTotais(
                      stateCheckedDespesas,
                      stateCheckedReceitas,
                      stateAnoAtual,
                      stateMesAtual
                    ));
                }}
          >
            <DeleteForeverTwoToneIcon />
          </IconButton>
          <IconButton
            aria-label="transfere"
            style={{ color: theme.palette.primary.dark, padding: 2 }}
            onClick={async () => {

              await props.OnClickTransfer()
              setStateTotais(
                await calculaTotais(
                  stateCheckedDespesas,
                  stateCheckedReceitas,
                  stateAnoAtual,
                  stateMesAtual
                )
              );
             
            }}
            size="small"
          >
            <ImportExportTwoToneIcon />
          </IconButton>
          <IconButton
            aria-label="pago"
            style={{
              color: field.row.pago
                ? theme.palette.success.dark
                : theme.palette.error.main,
              padding: 2,
            }}
            onClick={async () => {
                await props.onClickFlag();
            }}
          >
            <FiberManualRecordTwoToneIcon />
          </IconButton>
        </Box>
      );
    },
  };
};
