import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, useTheme } from "@material-ui/core";
import SpinCircular from "components/fc-spin/fc-spin";
import { Money } from "common";
import { useSpin } from "@hooks/use-spin";

export function FcCard(props: any) {
  const {
    onClick,
    color,
    value,
    description,
    children,
    ref,
    legendColor,
  } = props;

  const theme = useTheme();
  const spin = useSpin((state) => state.spin);

  return (
    <Card
      variant="outlined"
      style={{
        textAlign: "center",
        height: "100%",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: "none",
      }}
      ref={ref}
    >
      {spin ? (
        <SpinCircular />
      ) : (
        <CardActionArea onClick={onClick}>
          <CardContent style={{ margin: 0, padding: theme.spacing(1) }}>
            <Typography
              variant="h6"
              style={{ color: legendColor ?? theme.palette.text.primary }}
            >
              {description}
            </Typography>

            <Typography
              variant="h5"
              style={{ color: color ?? theme.palette.primary.light }}
            >
              {Money.format(value)}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
      {children}
    </Card>
  );
}
