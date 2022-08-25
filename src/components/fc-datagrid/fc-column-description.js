import { useTheme } from "@material-ui/core";

export default function FcColumnDescription() {
  const theme = useTheme();
  let width = 150;
  if (window.innerWidth > theme.breakpoints.values.sm) {
    width = 200;
  }
  return {
    field: "description",
    headerName: "Descrição",
    width: width,
  };
}
