import { useSpin } from "@hooks/use-spin";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";

export function FcCheckboxWalletStatus() {
  const { active, ...rest } = useFormWallet((state) => state.form);
  const spin = useSpin((state) => state.spin);

  const setForm = useFormWallet((state) => state.setForm);

  const onChange = (e: any) => {
    setForm({ ...rest, active: e.target.checked });
  };

  return (
    <FormControlLabel
      label={active ? "Ativo" : "Inativo"}
      control={
        <Checkbox checked={active} onChange={onChange} name="checkedPago" />
      }
      disabled={spin}
      style={{ margin: 0, padding: 0 }}
    />
  );
}
