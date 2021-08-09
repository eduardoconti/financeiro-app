import { useTheme } from "@material-ui/core";
export default function FcColumnWalletDestiny() {
  const theme = useTheme();
  let width = 100;
  if (window.innerWidth >= theme.breakpoints.values.sm) {
    width = 200;
  }

  return {
    field: "carteiraDestino",
    headerName: "Destino",
    width: width,
  };
}
