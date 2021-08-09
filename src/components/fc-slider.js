import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";

export default function DiscreteSlider({ value, setValue }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 100,
    },
    slider: {
      color: theme.palette.text.primary,
    },
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Slider
        defaultValue={0.02}
        value={value}
        aria-labelledby="discrete-slider-small-steps"
        step={0.02}
        min={0.04}
        max={0.5}
        valueLabelDisplay="auto"
        className={classes.slider}
        onChange={handleChange}
      />
    </div>
  );
}
