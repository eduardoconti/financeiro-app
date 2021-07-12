import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";
import {useTheme } from "@material-ui/core";
export default function CheckboxLabels({ setStateChecked, stateChecked }) {
  const theme = useTheme();
  const handleChange = (event) => {
    var resultado = 0;
    var name = event.target.name;
    function readProp(obj, prop) {
      return obj[prop];
    }

    for (var i in stateChecked) {
      if (stateChecked[i]) {
        resultado++;
      }
    }
    if (
      !(
        resultado === Object.keys(stateChecked).length - 1 &&
        readProp(stateChecked, name)
      )
    ) {
      setStateChecked({
        ...stateChecked,
        [event.target.name]: event.target.checked,
      });
    }
  };

  return (
    <Grid container spacing={1} justify="center">
      <FormControlLabel
        control={
          <Checkbox
            checked={stateChecked.checkedPago}
            onChange={handleChange}
            name="checkedPago"
            style={{ color: theme.palette.success.dark }}
          />
        }
        style={{ margin: 0, padding: 0 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stateChecked.checkedAberto}
            onChange={handleChange}
            name="checkedAberto"
            style={{ color: theme.palette.error.dark }}
          />
        }
        style={{ margin: 0, padding: 0 }}
      />
    </Grid>
  );
}
