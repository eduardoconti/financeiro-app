import { makeStyles } from "@material-ui/core";
import FcButton from "@components/fc-button/fc-button";

const useStyles = makeStyles((theme) => ({
  botao: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    height: 36,
    width: 100,
    color: theme.palette.text.primary,
    "&:hover": {
      background: theme.palette.primary.main,
      boxShadow:
        "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default function FcFormButton(props: any) {
  const classes = useStyles();
  const { description = "", onClick = () => {}, ...rest } = props;
  return (
    <FcButton
      className={classes.botao}
      description={description}
      onClick={onClick}
      {...rest}
    ></FcButton>
  );
}
