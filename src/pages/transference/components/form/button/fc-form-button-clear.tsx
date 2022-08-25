import FcFormIconButtonClear from "@components/fc-forms/fc-form-button/fc-form-icon-button-clear";
import { useFormTransference } from "@pages/transference/hooks";

export function FcFormButtonClearTransference() {
  const clear = useFormTransference((s) => s.clearAllFields);
  const onClick = () => {
    clear();
  };
  return <FcFormIconButtonClear description="limpar" onClick={onClick} />;
}
