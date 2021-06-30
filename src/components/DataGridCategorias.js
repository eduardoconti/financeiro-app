import React, { useEffect, useState } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { retornaCategorias, deletaCategoria } from "../common/CategoriaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Alert from "./Alert";
import { emptyAlertState } from "../common/EmptyStates";
import { retornaStateAlertExclusao } from "../common/AlertFuncoes";
const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridCategorias({ rows, setRows, setFormulario }) {
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
  const columns = [
    { field: "descricao", headerName: "Descricao", width: 150 },
    {
      field: "operacoes",
      headerName: "Operacoes",
      width: 120,
      sortable: false,
      renderCell: function operacoes(field) {
        return (
          <Box>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={() => {
                setFormulario(field.row);
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                let response = await deletaCategoria(field.row.id);
                setRows(await retornaCategorias());

                setAlert(
                  retornaStateAlertExclusao(
                    response.statusCode,
                    "Categoria",
                    response.message
                  )
                );
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    retornaCategorias().then((categorias) => {
      setRows(categorias);
    }); // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)}></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
