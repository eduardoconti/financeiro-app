
import { FcSelectFieldWallet } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
export function FcSelectFieldExpenseWallet() {
  const {
    formExpense: { walletId },
    dispatch,
  } = useFormExpense();
  const onChange = (event: any) => {
    dispatch({
      type: "setFormExpense",
      payload: { walletId: event.target.value },
    });
  };

    return (
      <FcSelectFieldWallet
        value={walletId}
        onChange={onChange}
      />
    );
}
