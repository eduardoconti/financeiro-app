import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function SpinCircular(props) {
  const classes = useStyles();
  if (true) {
    return (
      <div className={classes.root}>
        <CircularProgress
          color="primary"
          disableShrink={false}
          variant="indeterminate"
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}
