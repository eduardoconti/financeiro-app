import React from "react";
import Radio from "@material-ui/core/Radio";
import { Grid } from "@material-ui/core";

export default function RadioButtons({ setStateGrafico, cor, descricao }) {
  const [selectedValue, setSelectedValue] = React.useState("1");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setStateGrafico(event.target.value);
  };

  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item xs={1}>
        <Radio
          checked={selectedValue === "1"}
          onChange={handleChange}
          value="1"
          name="radio_1"
          inputProps={{ "aria-label": "1" }}
          style={{ color: cor }}
          size="small"
        />
      </Grid>
      <Grid item xs={1}>
        <Radio
          checked={selectedValue === "2"}
          onChange={handleChange}
          value="2"
          name="radio_2"
          inputProps={{ "aria-label": "2" }}
          style={{ color: cor }}
          size="small"
        />
      </Grid>
      <Grid item xs={8} style={{ textAlign: "center", color: "#625D5D" }}>
        <p>{descricao}</p>
      </Grid>
    </Grid>
  );
}
