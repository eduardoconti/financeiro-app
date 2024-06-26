import { useTheme, Paper } from "@material-ui/core";

export default function FcSurface(props: any) {
  const theme = useTheme();
  const { children, style, elevation = 1 } = props;

  return (
    <Paper
      elevation={elevation}
      style={{
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        ...style,
      }}
    >
      {children}
    </Paper>
  );
}
