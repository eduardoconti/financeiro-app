import { useTheme, Grid } from "@material-ui/core";

export default function FcSurface(props: any) {
  const theme = useTheme();
  const { children } = props;
  return (
    <Grid container
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {children}
    </Grid>
  );
}
