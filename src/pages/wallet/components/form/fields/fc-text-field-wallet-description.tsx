import { FcTextFieldDescription } from "@components/fc-forms/fc-fields";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";

export function FcTextFieldWalletDescription() {
  const { description, ...rest } = useFormWallet((state) => state.form);
  const { invalidFields } = useFormWallet((state) => {
    return { invalidFields: state.invalidFields };
  });
  const setForm = useFormWallet((state) => state.setForm);

  const onChange = (e: any) => {
    setForm({ ...rest, description: e.target.value });
  };

  return (
    <FcTextFieldDescription
      value={description}
      onChange={onChange}
      invalidFields={invalidFields}
    />
  );
}
