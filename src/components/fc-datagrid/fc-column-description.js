import { useTheme } from "@material-ui/core";

export default function FcColumnDescription() {
  const theme = useTheme();
  let width = 100;
  if (window.innerWidth >= theme.breakpoints.values.sm) {
    width = 200;
  }
  return {
    field: "descricao",
    headerName: "Descrição",
    width: width,
  };
}
