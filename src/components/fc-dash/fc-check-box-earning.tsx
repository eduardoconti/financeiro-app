import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
export function CheckboxLabelsEarning(props: any) {
  const { palette } = useTheme();
  const spin = useSpin((state) => state.spin);
  const {
    check: { open, payed },
    setChecked,
  } = useDashValues((state) => ({
    check: state.checkEarnings,
    setChecked: state.setCheckEarnings,
  }));
  const handleChangePayed = (event: any) => {
    if (!open && !event.target.checked) {
      return;
    }
    setChecked({ open, payed: event.target.checked });
  };

  const handleChangeOpen = (event: any) => {
    if (!payed && !event.target.checked) {
      return;
    }
    setChecked({ payed, open: event.target.checked });
  };
  return (
    <Grid container spacing={1} justifyContent="center">
      <FormControlLabel
        label={""}
        control={
          <Checkbox
            checked={payed}
            onChange={handleChangePayed}
            name="checkedPago"
            style={{ color: spin ? palette.grey[400] : palette.success.main }}
          />
        }
        disabled={spin}
        style={{ margin: 0, padding: 0 }}
      />
      <FormControlLabel
        label={""}
        control={
          <Checkbox
            checked={open}
            onChange={handleChangeOpen}
            name="checkedAberto"
            style={{ color: spin ? palette.grey[400] : palette.error.light }}
          />
        }
        disabled={spin}
        style={{ margin: 0, padding: 0 }}
      />
    </Grid>
  );
}
