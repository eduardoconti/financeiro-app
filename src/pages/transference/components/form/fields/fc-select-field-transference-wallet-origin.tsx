import { FcSelectFieldWallet } from "@components/fc-forms/fc-fields";
import { useFormTransference } from "@pages/transference/hooks";

import shallow from "zustand/shallow";

export function FcSelectFieldTransferenceWalletOrigin() {
  const {
    walletOriginId,
    setWalletOriginId,
    invalidFields,
  } = useFormTransference(
    (s) => ({
      walletOriginId: s.walletOriginId,
      setWalletOriginId: s.setWalletOriginId,
      invalidFields: s.invalidFields,
    }),
    shallow
  );
  const onChange = (e: any) => {
    setWalletOriginId(parseInt(e.target.value));
  };
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "carteiraOrigemId";
  });
  return (
    <FcSelectFieldWallet
      label="Carteira Origem"
      value={walletOriginId}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
