import { makeStyles } from "@material-ui/core/styles";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function SpinCircular(props: CircularProgressProps) {
  const classes = useStyles();
  const { size = 42.5, color = "primary" } = props;

  return (
    <div className={classes.root}>
      <CircularProgress
        color={color}
        disableShrink={false}
        variant="indeterminate"
        size={size}
      />
    </div>
  );
}
