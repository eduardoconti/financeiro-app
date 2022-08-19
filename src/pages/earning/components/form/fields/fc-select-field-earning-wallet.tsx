import { FcSelectFieldWallet } from "@components/fc-forms/fc-fields";
import { useFormEarning } from "@pages/earning/hooks";
import shallow from "zustand/shallow";

export function FcSelectFieldEarningWallet() {
  const { walletId, setForm, invalidFields } = useFormEarning((state) => ({ walletId: state.walletId, setForm: state.setWalletId, invalidFields: state.invalidFields }), shallow);
  const onChange = (e: any) => {
    setForm(parseInt(e.target.value));
  }
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "carteiraId";
  });
  return (
    <FcSelectFieldWallet value={walletId} onChange={onChange} invalidFields={invalidFieldMessage} />
  )
}