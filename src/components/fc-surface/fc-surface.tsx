import { useTheme, Box } from "@material-ui/core";

export default function FcSurface(props: any) {
  const theme = useTheme();
  const { children } = props;
  return (
    <Box 
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1)
      }}
    >
      {children}
    </Box>
  );
}
