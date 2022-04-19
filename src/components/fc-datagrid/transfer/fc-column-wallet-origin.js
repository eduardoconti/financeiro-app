import { useTheme } from "@material-ui/core";

export default function FcColumnWalletOrigin() {
  const theme = useTheme();
  let width = 100;
  if (window.innerWidth >= theme.breakpoints.values.sm) {
    width = 200;
  }
  return {
    field: "carteiraOrigemId",
    headerName: "Origem",
    width: width,
  };
}
