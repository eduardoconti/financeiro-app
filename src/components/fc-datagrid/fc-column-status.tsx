import { Typography, useTheme } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";

export default function FcColumnStatus(): GridColDef {
  const theme = useTheme();
  let width = 130;
  if (window.innerWidth > theme.breakpoints.values.sm) {
    width = 200;
  }
  return {
    field: "active",
    headerName: "Status",
    width: width,
    renderCell: function status(field: { row: any }) {
      return (
        <Typography variant="subtitle1">
          {field.row.active ? "Ativo" : "Inativo"}
        </Typography>
      );
    },
  };
}
