import { FcSelectFieldWallet } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";

export function FcSelectFieldExpenseWallet() {
  const { invalidFields, walletId, setWalletId } = useFormExpense(
    (s) => ({
      invalidFields: s.invalidFields,
      walletId: s.walletId,
      setWalletId: s.setWalletId,
    }),
    shallow
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletId(parseInt(event.target.value));
  };

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "carteiraId";
  });

  return (
    <FcSelectFieldWallet
      value={walletId}
      onChange={onChange}
      required
      invalidFields={invalidFieldMessage}
    />
  );
}
