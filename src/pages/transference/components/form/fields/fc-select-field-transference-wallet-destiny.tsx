import { FcSelectFieldWallet } from "@components/fc-forms/fc-fields";
import { useFormTransference } from "@pages/transference/hooks";

import shallow from "zustand/shallow";

export function FcSelectFieldTransferenceWalletDestiny() {
  const {
    walletDestinyId,
    setWalletDestinyId,
    invalidFields,
  } = useFormTransference(
    (s) => ({
      walletDestinyId: s.walletDestinyId,
      setWalletDestinyId: s.setWalletDestinyId,
      invalidFields: s.invalidFields,
    }),
    shallow
  );
  const onChange = (e: any) => {
    setWalletDestinyId(parseInt(e.target.value));
  };
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "carteiraDestinoId";
  });
  return (
    <FcSelectFieldWallet
      label="Carteira Destino"
      value={walletDestinyId}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
