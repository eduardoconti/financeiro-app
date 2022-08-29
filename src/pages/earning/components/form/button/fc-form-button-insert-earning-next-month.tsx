import { setCreatedAlert } from "@common/AlertFuncoes";
import { addMonth } from "@common/DateHelper";
import FcFormIconButtonAddNextMonth from "@components/fc-forms/fc-form-button/fc-form-icon-button-add-next-month";
import { useSpin } from "@hooks/use-spin";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";

export function FcFormButtonInsertEarningNextMonth() {
  const { setAlert } = useContext(ContextAlert);
  const { id, setInvalidFields } = useFormEarning();
  const { earnings, insertEarningNextMonth } = useEarning();

  const { setSpin } = useSpin();
  const onClick = async () => {
    try {
      setSpin(true);
      const earning = earnings.find((e) => e.id === id);
      if (!earning) return;
      const { carteira, pagamento, ...rest } = earning;
      const { status, message, internalMessage } = await insertEarningNextMonth(
        {
          ...rest,
          carteiraId: carteira.id,
          pagamento: addMonth(pagamento),
        }
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setInvalidFields(error?.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return (
    <FcFormIconButtonAddNextMonth
      description="nextMonth"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
