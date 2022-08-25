import { useTheme } from "@material-ui/core";

export const FcColumnWalletOrigin = () => {
  const theme = useTheme();
  let width = 100;
  if (window.innerWidth >= theme.breakpoints.values.sm) {
    width = 200;
  }
  return {
    field: "walletOrigin",
    headerName: "Origem",
    width: width,
  };
};
